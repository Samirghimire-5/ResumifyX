import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDefaultTemplate from "../templates/pdfTemplates/defaultTemplate";
import { useSelector } from "react-redux";

const ResumePdfDownload = () => {
const resume = useSelector((state: any) => state.resumeData)
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const generatePdf = async () => {
      const { pdf } = await import('@react-pdf/renderer');
      const blob = await pdf(<PdfDefaultTemplate resume={resume} />).toBlob();
      setPdfUrl(URL.createObjectURL(blob));
    };

    generatePdf();
    
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [resume]);

  if (!pdfUrl) return (
    <button disabled className="px-4 py-2 bg-gray-400 text-white rounded-lg">
      Preparing PDF...
    </button>
  );
  return (
    <a
      download="resume.pdf"
      href={pdfUrl}
      className="flex px-2 py-2 bg-black text-white rounded-lg"
    >
      Download PDF
    </a>
  );
};

export default ResumePdfDownload;
