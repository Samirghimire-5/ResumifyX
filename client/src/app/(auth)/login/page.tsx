"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import {userData} from "@/lib/redux/user/userSlice"
import { AppDispatch } from "@/lib/redux/store";


type LoginFormInputs = {
  email: string;
  password: string;
};


const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()

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
        {withCredentials: true}
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        dispatch(userData(response.data.user))
        
        router.push("/resume");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-md p-8 border border-indigo-500/30">
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">ACCESS PORTAL</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter valid email",
                },
              })}
              type="email"
              placeholder="Email"
              className={`w-full px-3 py-2 bg-gray-800 bg-opacity-50 border-b-2 border-indigo-500/50 focus:border-violet-500 transition-all text-gray-100 placeholder-gray-400 focus:outline-none rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-400 font-semibold mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full px-3 py-2 bg-gray-800 bg-opacity-50 border-b-2 border-indigo-500/50 focus:border-violet-500 transition-all text-gray-100 placeholder-gray-400 focus:outline-none rounded-md ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-indigo-400 focus:outline-none"
            >
              {showPassword ? (
                <Eye size={20} className="text-violet-400" />
              ) : (
                <EyeOff size={20} className="text-violet-400" />
              )}
            </button>
            {errors.password && (
              <p className="text-sm text-red-400 font-semibold mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2">
              <span>
                <Checkbox className="border-indigo-500 text-violet-500 focus:ring-violet-500/20" />
              </span>{" "}
              <span className="text-gray-300 text-sm">Remember Me</span>
            </p>
            <Link
              href="/forgot-password"
              className="text-cyan-400 font-semibold hover:text-violet-400 transition-colors text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-md hover:from-indigo-700 hover:to-violet-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 mt-2 shadow-lg shadow-indigo-500/20"
          >
            {isSubmitting ? "AUTHENTICATING..." : "LOGIN"}
          </Button>

          <div className="font-serif text-center mt-2">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-cyan-400 hover:text-violet-400 transition-colors"
              >
                SIGN UP
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;