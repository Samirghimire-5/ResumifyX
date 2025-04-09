"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setImage,
  setPersonalInfo,
} from "@/lib/redux/resumeData/resumeDataSlice";
import { ChevronRight } from "lucide-react";
import { debounce } from 'lodash';

const PersonalInfo = ({ setActiveForm }: any) => {
  const initialValue = useSelector((state: any) => state.resumeData.personalInfo)    // to set initial value of inputs
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  console.log(initialValue)

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
    formState: {},
  } = useForm<FormInputs>();

  const watchedFields = watch([
    "fullName",
    "jobTitle",
    "phone",
    "address",
    "email",
  ]);

  const formValue = useMemo(() => ({
    fullName: watchedFields[0],
    jobTitle: watchedFields[1],
    phone: watchedFields[2],
    address: watchedFields[3],
    email: watchedFields[4],
  }), [JSON.stringify(watchedFields)]);

  useEffect(() => {
    const debouncedDispatch = debounce(() => {
      dispatch(setPersonalInfo(formValue));
    }, 500); // 500ms debounce time
  
    debouncedDispatch();
    return () => debouncedDispatch.cancel();
  }, [formValue]);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // console.log("file", file)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        dispatch(setImage(base64String)); // now image in Redux is base64
      };
      reader.readAsDataURL(file);
    }
  };

// prevents input fields from being empty gets data from previously saved data in redux
  useEffect(() => {
    if (initialValue) {
      if (initialValue.image && !selectedFile) {
        setSelectedFile(initialValue.image); // Just showing file name for now
      }
      setValue('fullName', initialValue.fullName || '');
      setValue('jobTitle', initialValue.jobTitle || '');
      setValue('phone', initialValue.phone || '');
      setValue('address', initialValue.address || '');
      setValue('email', initialValue.email || '');
    }
  }, [initialValue, setValue]);
  

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("fullName", data.fullName);
    formData.append("jobTitle", data.jobTitle || "");
    formData.append("phone", data.phone || "");
    formData.append("address", data.address || "");
    formData.append("email", data.email);

    setActiveForm("Experiences");
  };

  const deleteImage = () => {
    dispatch(setImage(""));
    setSelectedFile(null);
    setValue("image", undefined);
  };

  const preventDefault = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
  };

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
          <div className="flex gap-2">
            <Input
              type="file"
              placeholder="Choose a file"
              {...register("image")}
              onChange={handleFileChange}
              onKeyDown={(e) => preventDefault(e)}
            />
            {selectedFile && <Button onClick={deleteImage}>Delete</Button>}
          </div>
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Full name</label>
          <Input
            placeholder="Jhon Doe"
            {...register("fullName")}
            onKeyDown={(e) => preventDefault(e)}
          />
        </div>

        <div className="flex justify-between gap-2 w-full">
          <div className="w-full">
            <label className="font-semibold font-sans text-sm">Job title</label>
            <Input
              placeholder="Software Developer"
              {...register("jobTitle")}
              onKeyDown={(e) => preventDefault(e)}
            />
          </div>

          <div className="w-full">
            <label className="font-semibold font-sans text-sm">Phone</label>
            <Input
              {...register("phone")}
              onKeyDown={(e) => preventDefault(e)}
            />
          </div>
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Address</label>
          <Input
            {...register("address")}
            onKeyDown={(e) => preventDefault(e)}
          />
        </div>

        <div className="w-full">
          <label className="font-semibold font-sans text-sm">Email</label>
          <Input
            placeholder="jhondoe@gmail.com"
            type="email"
            {...register("email")}
            onKeyDown={(e) => preventDefault(e)}
          />
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
