import React from "react";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const ResumePdfDownload = ({ resume, imageUrl }: any) => {
  const downloadResume = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pdfGenerate`,
        { ...resume, imageUrl },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };
  return (
    <Button onClick={downloadResume} className="flex items-center gap-2">
      <Download size={16} />
      {/* {loading ? "Generating PDF..." : "Download Resume"} */}
      download
    </Button>
  );
};

export default ResumePdfDownload;
