"use client";
import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSummary } from "@/lib/redux/resumeData/resumeDataSlice";
import { ChevronRight, Save } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Summary = () => {
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);
  const userInfo = useSelector((state: any) => state.userData.user);
  const resume = useSelector((state: any) => state.resumeData);
  const dispatch = useDispatch();

  const save = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resume`,
        {
          userId: userInfo._id,
          ...resume,
        },
        { withCredentials: true }
      );

      if (response.status === 400) return toast.error(response.data.error);

      if (response.status === 200) {
        return toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleChange = () => {
    if (summaryRef.current) {
        dispatch(setSummary(summaryRef?.current?.value));
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Summary</p>
        <p className="font-light text-sm">
          Write a short introduction for your resume
        </p>
      </div>

      <Textarea
        placeholder="Write something...."
        ref={summaryRef}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="bg-green-500 font-sans hover:bg-green-700"
        onClick={save}
      >
        <Save />
        Save
      </Button>
    </div>
  );
};

export default Summary;
