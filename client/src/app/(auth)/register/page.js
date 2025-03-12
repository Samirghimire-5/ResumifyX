"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"

const Register = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", data)
      if (response.status === 201) {
      toast.success(response.data.message)
       router.push('/login')
      }
      
    } catch (error) {
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
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-[url(/spider.jpg)]">
      <div className="flex flex-col items-center gap-4 bg-transparent backdrop-blur-sm rounded-lg shadow-xl w-full max-w-[400] p-8">
        <div className="text-center mb-5 w-full">
          <h1 className="font-bold text-3xl text-white">Sign Up</h1>
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
              className={`w-full px-3 py-2 bg-transparent border-b-2 border-white focus:border-white transition-all text-white placeholder-gray-300 focus:outline-none ${
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
              className={`w-full px-3 py-2 bg-transparent border-b-2 border-white focus:border-white transition-all text-white placeholder-gray-300 focus:outline-none ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-1 top-1 text-white focus:outline-none"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-300" />
              ) : (
                <Eye size={20} className="text-gray-300" />
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
              className={`w-full px-3 py-2 bg-transparent border-b-2 border-white focus:border-white transition-all text-white placeholder-gray-300 focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-2 text-white focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} className="text-gray-300" />
              ) : (
                <Eye size={20} className="text-gray-300" />
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
            className="w-full bg-white text-black rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 mt-4"
          >
            {isSubmitting ? "Signing Inn ..." : "Sign Up"}
          </Button>
        </form>

        <div className="font-serif">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <span className="font-semibold text-blue-500 hover:underline">
              <Link href={"/login"}>Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;