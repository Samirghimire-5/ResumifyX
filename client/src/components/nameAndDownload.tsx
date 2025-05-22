import React, { useState } from "react";
import { Button } from "./ui/button";
import ResumePdfDownload from "./pdf/resumePdfDownload";

const NameAndDownload = () => {
  return (
    <div className="flex items-center justify-between min-w-[40%] max-w-[40%] h-16 px-7 bg-gray-100 rounded-2xl shadow-xl">
      <div>Resume 1</div>

      <div>
        <ResumePdfDownload />
      </div>

    </div>
  );
};

export default NameAndDownload;
