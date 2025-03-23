"use client";
import React from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import Image from "next/image";

const PreviewSec = ({previewPhoto}: any) => {
  const resume = useSelector((state: any) => state.resumeData.personalInfo)
  console.log(resume)
  return (
      <Card className="h-[75%] w-[55%] shadow-xl bg-gray-100 rounded-2xl">
        <div>
          {previewPhoto && <Image src={previewPhoto} height={100} width={100} alt="preview Image"/>}
          <h1>{resume.fullName}</h1>
          <p>{resume.jobTitle}</p>
          <p>{resume.phone}</p>
          <p>{resume.address}</p>
          <p>{resume.email}</p>
        </div>
      </Card>
  );
};

export default PreviewSec;
