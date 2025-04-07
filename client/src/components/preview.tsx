"use client";
import React, { Suspense, useRef } from "react";
import { Card } from "./ui/card";
import { previewTemplates } from "./templates";

const PreviewSec = ({resume}: any) => {
  const selectedTemplate = resume?.selectedTemplate || "default";
  const TemplateComponent = 
  // previewTemplates[selectedTemplate] ||
   previewTemplates["default"];


  return (
    <Card className="flex flex-col min-h-[80vh] max-h-[80vh] w-[55%] shadow-xl rounded-2xl overflow-auto">
        <Suspense fallback={<p>Loading template...</p>}>
          {TemplateComponent ? (
            <TemplateComponent resume={resume} />
          ) : (
            <p>Template not found</p>
          )}
        </Suspense>
    </Card>
  );
};

export default PreviewSec;

{/* <div className="flex justify-end mr-3">
<ResumePdfDownload resume={resume} />
</div> */}
