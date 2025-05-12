"use client";
import React, { Suspense, useRef } from "react";
import { Card } from "./ui/card";
import { previewTemplates } from "./templates";
import ResumePdfPrev from "./pdf/resumePdfPrev";
import { useSelector } from "react-redux";
import PreviewDefaultTemplate from "./templates/PreviewTemplates/defaultTemplate";
import ResumePdfDownload from "./pdf/resumePdfDownload";
import { Button } from "./ui/button";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const PreviewSec = () => {
  const resumeRef = useRef(null);
  const resume = useSelector((state: any) => state.resumeData);

  const handleDownload = () => {
    if (!resumeRef.current) return console.log("aayena");

    toPng(resumeRef.current, { pixelRatio: 2 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("newResume.pdf");
      })
      .catch((err) => {
        console.error("Failed to generate PDF:", err);
      });
  };

  const selectedTemplate = resume?.selectedTemplate || "default";
  const TemplateComponent =
    // previewTemplates[selectedTemplate] ||
    previewTemplates["default"];

  return (
    // <Card className="flex flex-col max-h-[100%] w-full p-[20px] shadow-xl rounded-2xl overflow-auto">
    <div>
      <Suspense fallback={<p>Loading template...</p>}>
        {/* {TemplateComponent ? (
          <TemplateComponent className="p-[20px] shadow-xl" resume={resume} resumeRef={resumeRef} />
        ) : (
          <p>Template not found</p>
        )} */}

        {/* this below preview section is preview from reactpdf/render */}
        <div className="bg-white w-full h-full">
          <ResumePdfPrev />
        </div>
      </Suspense>
      <Button onClick={handleDownload}>download</Button>
    </div>
    // </Card>
  );
};

export default PreviewSec;

// {
/* <div className="flex justify-end mr-3">
<ResumePdfDownload resume={resume} />
</div> */
// }
