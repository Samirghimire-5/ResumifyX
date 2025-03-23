"use client"
import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { summary } from "@/lib/redux/resumeData/resumeDataSlice";

const Summary = () => {
  const summaryRef = useRef<HTMLTextAreaElement | null>(null)
  const dispatch = useDispatch()

  const handleChange = () => {
    if (summaryRef.current) {
      const timer = setTimeout(() => {
        dispatch(summary(summaryRef?.current?.value))
      }, 1000)
      return () => clearTimeout(timer);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Summary</p>
        <p className="font-light text-sm">
          Write a short introduction for your resume
        </p>
      </div>

      <Textarea placeholder="Write something...." ref={summaryRef} onChange={handleChange}/>

      <Button type="submit">Next</Button>
    </div>
  );
};

export default Summary;
