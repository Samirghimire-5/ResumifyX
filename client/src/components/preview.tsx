"use client";
import React, { Suspense, useRef } from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import templates from "./templates";
import ResumePdfDownload from "./resumePdfDownload";

const PreviewSec = () => {
  const resume = useSelector((state: any) => state.resumeData);
  const imageUrl = resume?.personalInfo.image;

  const selectedTemplate = resume?.selectedTemplate;
  const TemplateComponent = templates[selectedTemplate] || templates["default"];

  const downloadResume = () => {};

  return (
    <Card className="flex flex-col h-[80%] w-[55%] shadow-xl bg-gray-100 rounded-2xl px-2 mr-4">
      <div className="flex justify-end mr-3">
        <ResumePdfDownload resume={resume} imageUrl={imageUrl} />
      </div>
      <div className="bg-white w-full h-full overflow-auto">
        <Suspense fallback={<p>Loading template...</p>}>
          {TemplateComponent ? (
            <TemplateComponent resume={resume} imageUrl={imageUrl} />
          ) : (
            <p>Template not found</p>
          )}
        </Suspense>
      </div>
    </Card>
  );
};

export default PreviewSec;
