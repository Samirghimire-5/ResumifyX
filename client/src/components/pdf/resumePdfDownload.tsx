import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDefaultTemplate from "../templates/pdfTemplates/defaultTemplate";
import { useSelector } from "react-redux";

const ResumePdfDownload = () => {
const resume = useSelector((state: any) => state.resumeData)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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



// import React, { useEffect, useState } from "react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PdfDefaultTemplate from "../templates/pdfTemplates/defaultTemplate";
// import { useSelector } from "react-redux";
// import { Button } from "../ui/button";
// import axios from "axios";

// const ResumePdfDownload = () => {
//   const downloadPdf = async () => {
//     const fileName = "mula";
//     const response = await axios.post(
//       "http://localhost:8000/api/download",
//       {
//         fileName,
//       },
//       {
//         responseType: "blob",
//       }
//     );
//     console.log(response);

//     const blob = new Blob([response.data], { type: "application/pdf" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "resume.pdf";
//     link.click();
//   };
//   return <Button onClick={downloadPdf}>dwnload pdf</Button>;
// };

// export default ResumePdfDownload;




// import React from "react";
// import { Button } from "../ui/button";
// import { jsPDF } from "jspdf";
// import {toPng} from "html-to-image";

// const ResumePdfDownload = (resumeRef) => {
//  const handleDownload = () => {
//     if (!resumeRef.current) return console.log('aayena')

    
//       toPng(resumeRef.current, { pixelRatio: 2 })
//       .then((dataUrl) => {
//         const pdf = new jsPDF("p", "mm", "a4");
//         const imgProps = pdf.getImageProperties(dataUrl);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save("newResume.pdf");
//       })
//       .catch((err) => {
//         console.error("Failed to generate PDF:", err);
//       });
//   };
//   return <Button onClick={handleDownload}>dwnload pdf</Button>;
// };

// export default ResumePdfDownload;