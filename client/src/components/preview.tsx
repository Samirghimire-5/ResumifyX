"use client";
import React from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";

const PreviewSec = () => {
  const resume = useSelector((state: any) => state.resumeData.personalInfo)
  return (
      <Card className="h-[75%] w-[55%] shadow-xl bg-gray-100 rounded-2xl">
        <div>
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
