"use client";
import React from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import Image from "next/image";

const PreviewSec = ({ previewPhoto }: any) => {
  const resume = useSelector((state: any) => state.resumeData);

  return (
    <Card className="h-[75%] w-[55%] shadow-xl bg-gray-100 rounded-2xl p-2">
      {/* A4 Page Container */}
      <div className="w-full h-full bg-white p-7 box-border shadow-md overflow-y-auto">
        {/* Resume Content */}
        <div className="font-sans text-base">
          {/* Personal Info */}
          {resume.personalInfo && (
            <div>
              <h1 className="text-3xl font-bold">{resume.personalInfo.fullName}</h1>
              <p className="text-lg">{resume.personalInfo.jobTitle}</p>
              {/* Add other personal info fields */}
            </div>
          )}

          {/* Summary */}
          {resume.summary && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Summary</h2>
              <p>{resume.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resume.experience && resume.experience.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Experience</h2>
              {resume.experience.map((exp: any, index: any) => (
                <div key={index} className="mt-2">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p>{exp.companyName}</p>
                  <p>{exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) : null} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) : null}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resume.education && resume.education.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Education</h2>
              {resume.education.map((edu : any, index: any) => (
                <div key={index} className="mt-2">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p>{edu.school}</p>
                  <p>{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resume.skills && resume.skills.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              <ul className="list-disc list-inside">
                {resume.skills.map((skill: any, index: any) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PreviewSec;