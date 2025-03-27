"use client"
import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSummary } from "@/lib/redux/resumeData/resumeDataSlice";
import { ChevronRight } from "lucide-react";

const Summary = ({setActiveForm}: any) => {
  const summaryRef = useRef<HTMLTextAreaElement | null>(null)
  const dispatch = useDispatch()

  const handleChange = () => {
    if (summaryRef.current) {
      const timer = setTimeout(() => {
        dispatch(setSummary(summaryRef?.current?.value))
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

      <Button type="submit" onClick={() => setActiveForm('Experience')}>Next <ChevronRight /></Button>
    </div>
  );
};

export default Summary;
