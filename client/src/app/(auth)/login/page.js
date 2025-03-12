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

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data,
        {withCredentials: true}
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-[url(/spider.jpg)]">
      <div className="bg-transparent backdrop-blur-sm rounded-lg shadow-xl w-full max-w-[400] p-8">
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl text-white">Login</h1>
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
              className={`w-full px-3 py-2 bg-transparent border-b-2 border-white focus:border-white transition-all text-white placeholder-gray-300 focus:outline-none ${
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
              className={`w-full px-3 py-2 bg-transparent border-b-2 border-white focus:border-white transition-all text-white placeholder-gray-300 focus:outline-none ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-white focus:outline-none"
            >
              {showPassword ? (
                <Eye size={20} className="text-gray-300" />
              ) : (
                <EyeOff size={20} className="text-gray-300" />
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
                <Checkbox />
              </span>{" "}
              <span className="text-white">Remember Me</span>
            </p>
            <Link
              href="/forgot-password"
              className="text-blue-500 font-semibold hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 mt-2"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className=" font-serif text-center mt-2">
            <p className="text-white text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
