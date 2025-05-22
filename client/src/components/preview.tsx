"use client";
import React, { Suspense } from "react";
import { previewTemplates } from "./templates";
import { useSelector } from "react-redux";
const PreviewSec = () => {
  const resume = useSelector((state: any) => state.resumeData);
  const selectedTemplate = resume?.selectedTemplate || "default";
  const TemplateComponent =
    // previewTemplates[selectedTemplate] ||
    previewTemplates["default"];

  return (
   <div className="w-[550px]  h-screen p-[13.4708mm]  border bg-white">
        <Suspense fallback={<p>Loading template...</p>}>
          {TemplateComponent ? (
            <TemplateComponent resume={resume} />
          ) : (
            <p>Template not found</p>
          )}
        </Suspense>
    </div>
  );
};

export default PreviewSec;