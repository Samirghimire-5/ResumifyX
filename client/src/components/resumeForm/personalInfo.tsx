"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setImage, setPersonalInfo } from "@/lib/redux/resumeData/resumeDataSlice";
import { ChevronRight, FileLineChart } from "lucide-react";

const PersonalInfo = ({ setActiveForm }: any) => {
  // const reduxValue = useSelector((state: any) => state.resumeData.personalInfo)    // to set initial value of inputs
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const dispatch = useDispatch();

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
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormInputs>();

  const watchedFields = watch([
    "fullName",
    "jobTitle",
    "phone",
    "address",
    "email",
  ]);

  const formValue = {
    fullName: watchedFields[0],
    jobTitle: watchedFields[1],
    phone: watchedFields[2],
    address: watchedFields[3],
    email: watchedFields[4],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setPersonalInfo(formValue));
    }, 500);

    return () => clearTimeout(timer);
  }, [formValue]);


  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e?.target?.files[0];
      setSelectedFile(file.name)

      const objectUrl = URL.createObjectURL(file);
      dispatch(setImage(objectUrl))
    }
  };

  // useEffect(() => {    // this is to set the initial form value that user typed which is stored in redux
  //   if (reduxValue) {
  //     setValue('fullName', reduxValue.fullName)
  //   }
  // }, [reduxValue, setValue])

  const onSubmit = async (data: any) => {
    const isValid = trigger();
    const formData = new FormData();
    if (!isValid) {
      return toast.error("fill out the details");
    } else {
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      formData.append("fullName", data.fullName);
      formData.append("jobTitle", data.jobTitle || '');
      formData.append("phone", data.phone || '');
      formData.append("address", data.address || '');
      formData.append("email", data.email);

      // try {
      //   const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/resumeImg`, formData);
      //   if (response.status === 200) {
      //     console.log(response);
      //   }

      // } catch (error) {
      //   console.log(error)
      // }
      setActiveForm("Summary");
    }
  };

  const deleteImage = () => {
    dispatch(setImage(''))
    setSelectedFile(null)
    setValue('image', undefined )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col font-serif items-center">
        <p className="font-bold text-xl">Personal Info</p>
        <p className="font-light text-sm">Tell us about yourself.</p>
      </div>

      <form
        encType="multipart/form-data"
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Your photo</label>
          <div className="flex">
          <Input
            type="file"
            placeholder="Choose a file"
            {...register("image")}
            onChange={handleFileChange}
          />
          {selectedFile && <Button onClick={deleteImage}>Delete</Button>}
          </div>
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Full name</label>
          <Input
            placeholder="Jhon Doe"
            {...register("fullName", {
              required: { value: true, message: "Add your Full name" },
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex justify-between gap-2 w-full">
          <div className="w-full">
            <label className="font-semibold font-sans text-sm">Job title</label>
            <Input placeholder="Software Developer" {...register("jobTitle")} />
          </div>

          <div className="w-full">
            <label className="font-semibold font-sans text-sm">Phone</label>
            <Input {...register("phone")} />
          </div>
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Address</label>
          <Input {...register("address")} />
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

        <Button type="submit" className="mt-4 w-20">
          Next
          <ChevronRight />
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfo;
