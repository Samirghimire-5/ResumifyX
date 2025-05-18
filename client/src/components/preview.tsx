"use client";
import React, { Suspense, useRef } from "react";
import { previewTemplates } from "./templates";
import { useSelector } from "react-redux";
const PreviewSec = () => {
  const resume = useSelector((state: any) => state.resumeData);
  const selectedTemplate = resume?.selectedTemplate || "default";
  const TemplateComponent =
    // previewTemplates[selectedTemplate] ||
    previewTemplates["default"];

  return (
   <div className="h-screen border bg-white">
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