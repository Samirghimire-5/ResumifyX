import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { googleLogin } from "@/lib/firebase/auth";
import api, { setAccessToken } from "@/axios/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserData } from "@/lib/redux/user/userSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const googleAuth = async () => {
    const { token } = await googleLogin();
    const response = await api.post("/api/user/auth", {
      token,
    });
    if (response.status === 200) {
      setAccessToken(response.data.accessToken);
      toast.success(response.data.message);
      dispatch(setUserData(response.data.user));
      router.push("/resume");
    } else {
      toast.error(response.data.error);
    }
  };
  return (
    <div>
      <Button
        className="flex gap-2 items-center mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:from-indigo-700 hover:to-violet-700 transition duration-300"
        onClick={googleAuth}
      >
        <FcGoogle /> <span>Google</span>
      </Button>
    </div>
  );
};

export default Login;
