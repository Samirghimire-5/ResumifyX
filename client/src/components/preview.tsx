"use client";
import React, { Suspense, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Color from 'colorjs.io';
import { Card } from "./ui/card";
import { useSelector } from "react-redux";
import templates from "./templates";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const PreviewSec = () => {
  const resume = useSelector((state: any) => state.resumeData);
  const imageUrl = resume?.personalInfo.image;

  const selectedTemplate = resume?.selectedTemplate;
  // Fixed the template selection - was using string 'selectedTemplate' instead of variable
  const TemplateComponent = templates[selectedTemplate] || templates["default"];

  const componentRef = useRef<HTMLDivElement | null>(null);
  const downloadPdf = () => {
    const input = componentRef.current;

    // if (!input) {
    //   console.error("Component ref is null");
    //   // setIsGeneratingPdf(false);
    //   return; // Exit if the ref is null
    // }

    html2canvas(input as HTMLElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error capturing component:", error);
      });
  };

  return (
    <Card className="flex flex-col h-[80%] w-[55%] shadow-xl bg-gray-100 rounded-2xl px-2 mr-4">
      <div className="flex justify-end mr-3">
        <Button onClick={downloadPdf} className="flex items-center gap-2">
          <Download size={16} />
          Download PDF
        </Button>
      </div>
      <div className="w-full h-full overflow-auto">
        <Suspense fallback={<p>Loading template...</p>}>
          {TemplateComponent ? (
            <TemplateComponent
              ref={componentRef}
              resume={resume}
              imageUrl={imageUrl}
            />
          ) : (
            <p>Template not found</p>
          )}
        </Suspense>
      </div>
    </Card>
  );
};

export default PreviewSec;
