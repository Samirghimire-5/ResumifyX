"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userData } from "@/lib/redux/user/userSlice";
import { AppDispatch } from "@/lib/redux/store";
import { googleLogin } from "@/lib/firebase/auth";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        data,
        { withCredentials: true },
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        dispatch(userData(response.data.user));

        router.push("/resume");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-md p-8 border border-indigo-500/30">
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            ACCESS PORTAL
          </h1>
        </div>
        <Button
          onClick={async () => {
            const { token } = await googleLogin();
            const response = await axios.post("/api/googleAuth", {
              token,
            });
            console.log(response.data);
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
