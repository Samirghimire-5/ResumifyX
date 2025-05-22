"use client";
import React from "react";
import InputSec from "@/components/resumeInput";
import PreviewSec from "@/components/preview";
import NameAndDownload from "@/components/nameAndDownload";

const Builder = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-screen overflow-y-scroll p-3">
      <div className="w-full">
        <NameAndDownload />
      </div>
      <div className="flex justify-between h-full w-full">
        <InputSec />
        <PreviewSec />
      </div>
    </div>
  );
};

export default Builder;
