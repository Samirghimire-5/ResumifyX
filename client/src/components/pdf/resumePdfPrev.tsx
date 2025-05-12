import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDefaultTemplate from "../templates/pdfTemplates/defaultTemplate";
import { useSelector } from "react-redux";

const ResumePdfPrev = () => {
  const resume = useSelector((state: any) => state.resumeData);
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-100 p-4">
      <PDFViewer
        width="100%"
        height="100%"
        className="pdf-viewer"
        showToolbar={false}
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: "794px", // A4 width
          height: "1123px", // A4 height
        }}
      >
        {resume && <PdfDefaultTemplate resume={resume} />}
      </PDFViewer>
    </div>
  ); 
};

export default ResumePdfPrev;
