"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();


  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, data)
      if (response.status === 201) {
      toast.success(response.data.message)
       router.push('/login')
      }      
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <div className="flex flex-col items-center gap-4 bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-md p-8 border border-indigo-500/30">
        <div className="text-center mb-5 w-full">
          <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">CREATE ACCOUNT</h1>
        </div>

        <form
          className="space-y-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              {...register("username", {
                required: { value: true, message: "Username is required" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 20, message: "Max length is 20" },
              })}
              placeholder="Username"
              className={`w-full px-3 py-2 bg-gray-800 bg-opacity-50 border-b-2 border-indigo-500/50 focus:border-violet-500 transition-all text-gray-100 placeholder-gray-400 focus:outline-none rounded-md ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-400 font-semibold mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value:
                    /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i,
                  message: "Please enter a valid email",
                },
              })}
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
                minLength: {
                  value: 6,
                  message: "Password must contain 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
                  message: "Password is weak",
                },
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
                <EyeOff size={20} className="text-violet-400" />
              ) : (
                <Eye size={20} className="text-violet-400" />
              )}
            </button>
            {errors.password && (
              <p className="text-sm text-red-400 font-semibold mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please confirm your password",
                },
                validate: (value) => {
                  if (watch("password") !== value)
                    return "Passwords do not match";
                },
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={`w-full px-3 py-2 bg-gray-800 bg-opacity-50 border-b-2 border-indigo-500/50 focus:border-violet-500 transition-all text-gray-100 placeholder-gray-400 focus:outline-none rounded-md ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-2 text-indigo-400 focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} className="text-violet-400" />
              ) : (
                <Eye size={20} className="text-violet-400" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-sm text-red-400 font-semibold mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-md hover:from-indigo-700 hover:to-violet-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 mt-4 shadow-lg shadow-indigo-500/20"
          >
            {isSubmitting ? "PROCESSING..." : "SIGN UP"}
          </Button>
        </form>

        <div className="font-serif mt-2">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <span className="font-semibold text-cyan-400 hover:text-violet-400 transition-colors">
              <Link href={"/login"}>LOGIN</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;