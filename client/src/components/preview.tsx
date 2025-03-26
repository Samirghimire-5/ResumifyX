"use client";
import React from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import Image from "next/image";

const PreviewSec = ({ previewPhoto }: any) => {
  const resume = useSelector((state: any) => state.resumeData); // resume object has {personalInfo, summary, experience, education, skills}
  // console.log(resume.experience);
  return (
    <Card className="h-[75%] w-[55%] shadow-xl bg-gray-100 rounded-2xl overflow-auto p-2">
      
    </Card>
  );
};

export default PreviewSec;
