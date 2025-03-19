"use client"
import React from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { changeActiveForm } from "@/lib/redux/resumeForms/formSlice";

const PersonalInfo = ({activeForm} : {activeForm: any}) => {
  const dispatch = useDispatch()
  interface FormInputs {
    image?: FileList;
    fullName: string;
    jobTitle: string;
    phone: string;
    address?: string;
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const handleClick = () => {
    dispatch(changeActiveForm("Summary"))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col font-serif items-center">
        <p className="font-bold text-xl">Personal Info</p>
        <p className="font-light text-sm">Tell us about yourself.</p>
      </div>

      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Your photo</label>
          <Input placeholder="Choose a file" {...register("image", {})} />
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Full name</label>
          <Input
            placeholder="Jhon Doe"
            {...register("fullName", {
              required: { value: true, message: "Please add your full name" },
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex justify-between gap-2 w-full">
          <div className="w-full">
            <label className="font-semibold font-sans text-sm">Job title</label>
            <Input
              placeholder="Software Developer"
              {...register("jobTitle", {
                required: { value: true, message: "Specify your job" },
              })}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs">{errors.jobTitle.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="font-semibold font-sans text-sm">Phone</label>
            <Input
              {...register("phone", {
                required: {
                  value: true,
                  message: "Please add your contact number",
                },
              })}
              placeholder="3939932992"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Address</label>
          <Input placeholder="Kathmandu, Nepal" {...register("address")} />
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Email</label>
          <Input
            placeholder="jhondoe@gmail.com"
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="mt-4 w-20" onClick={() => handleClick()}>
          Next
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfo;
