import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PdfDefaultTemplate from "../templates/pdfTemplates/defaultTemplate";

const ResumePdfPrev = ({ resume }: any) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className="text-lg font-bold mb-4">Resume Preview</h2>

      <PDFViewer width="100%" height="500px">
        <PdfDefaultTemplate resume={resume} />
      </PDFViewer>
    </div>
  );
};
export default ResumePdfPrev;
