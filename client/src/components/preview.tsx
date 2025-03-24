"use client";
import React from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import Image from "next/image";

const PreviewSec = ({ previewPhoto }: any) => {
  const resume = useSelector((state: any) => state.resumeData); // resume object has {personalInfo, summary, experience, education, skills}
  const experience = useSelector((state: any) => state.resumeData.experience)
  console.log(experience)
  return (
    <Card className="h-[75%] w-[55%] shadow-xl bg-gray-100 rounded-2xl">
      <div>
        <p>personal info</p>
        {previewPhoto && (
          <Image
            src={previewPhoto}
            height={100}
            width={100}
            alt="preview Image"
          />
        )}
        <h1>{resume.personalInfo.fullName || ""}</h1>
        <p>{resume.personalInfo.jobTitle || ""}</p>
        <p>{resume.personalInfo.phone || ""}</p>
        <p>{resume.personalInfo.address || ""}</p>
        <p>{resume.personalInfo.email || ""}</p>
      </div>

      <div>
        <p> summary</p>
        <p>{resume.summary || ""}</p>
      </div>

      <div>
        <p>experience</p>
        <div className="bg-black">
          {experience.map((item: any, index: any) => (
            <div key={index}>
              <p>{item.jobTitle}</p>

            </div>
          ))}
        </div>
      </div>

      <div>
        <p> skills</p>
        {resume.skills && resume.skills.length > 0 && (
          <div>
            {resume.skills.map((item: any, index: number) => (
              <div
                key={index}
                className="inline items-center justify-center mr-2 bg-black text-white font-mono rounded-sm px-3 py-1"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PreviewSec;
