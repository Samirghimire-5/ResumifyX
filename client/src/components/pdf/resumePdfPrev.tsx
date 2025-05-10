import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDefaultTemplate from "../templates/pdfTemplates/defaultTemplate";
import { useSelector } from "react-redux";


const ResumePdfPrev = () => {
  const resume = useSelector((state: any) => state.resumeData);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <PDFViewer
  style={{
    width: '100%',
    height: '100vh',
    // backgroundColor: 'white', // 🟢 Set background to white
    // border: 'none' // Optional: remove any default border
  }}
  showToolbar={false} // Optional: disable the toolbar
>
        {resume && <PdfDefaultTemplate resume={resume} />}
      </PDFViewer>
    </div>
  );
};

export default ResumePdfPrev;
