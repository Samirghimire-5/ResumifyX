import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 498) &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/refresh`,
        {},
        { withCredentials: true },
      );

      setAccessToken(refreshResponse.data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
