"use client";
import React, { Suspense } from "react";
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import templates from "./templates";

const PreviewSec = () => {
  const resume = useSelector((state: any) => state.resumeData);
  const imageUrl = resume?.personalInfo?.image

  const selectedTemplate = resume?.selectedTemplate
  const TemplateConponent = templates['selectedTemplate'] || templates['default']

  return (
    <Card className="h-[75%] w-[55%] shadow-xl bg-gray-100 rounded-2xl p-2">
      <Suspense fallback={<p>Loading template...</p>}>
        {TemplateConponent ? <TemplateConponent resume={resume} imageUrl={imageUrl}/>: <p>Template not found</p>}
      </Suspense>
    </Card>
  );
};

export default PreviewSec;