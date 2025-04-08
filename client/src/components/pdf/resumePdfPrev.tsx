import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDefaultTemplate from "../templates/pdfTemplates/defaultTemplate";
import { useSelector } from "react-redux";

const ResumePdfPrev = ({resume}: any) => {
 
  return (
    <div className="flex flex-col items-center w-full h-full">
      <PDFViewer width="100%" height="500px">
        {resume && <PdfDefaultTemplate resume={resume} />}
      </PDFViewer>
    </div>
  );
};
export default ResumePdfPrev;
