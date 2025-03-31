import React from "react";
import ResumePdfDownload from "./pdf/resumePdfDownload";
import ResumePdfPrev from "./pdf/resumePdfPrev";

const NameAndDownload = ({resume}:any) => {
  return (
    <div className="flex items-center justify-between min-w-[40%] max-w-[40%] h-16 px-7 bg-gray-100 rounded-2xl shadow-xl">
      <div>Resume 1</div>

      <div>
        <ResumePdfDownload resume={resume} />
      </div>
    </div>
  );
};

export default NameAndDownload;
