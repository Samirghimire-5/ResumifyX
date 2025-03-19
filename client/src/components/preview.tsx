"use client";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

const PreviewSec = () => {
  return (
      <Card className="h-[75%] w-[55%] shadow-xl bg-gray-100 rounded-2xl">
        <img src={"/background.jpg"} height={100} width={100}/>
      </Card>
  );
};

export default PreviewSec;
