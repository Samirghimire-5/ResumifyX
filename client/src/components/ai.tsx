import React from "react";
import { Card } from "./ui/card";
import { Info } from "lucide-react";
import { Textarea } from "./ui/textarea";

const Ai = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30 backdrop-blur-xs z-50">
      <Card className="flex items-center p-4 w-full max-w-md bg-gray-300">
        <p className="font-bold text-xl font-sans">Generate with ai</p>
        <div className="flex items-start w-full h-full mt-2">
          <span className="mr-2" ><Info className="size-4"/></span>
          <p className="text-sm font-serif">
            You can either give ai your information and it will provide a summary
            for you based on your information or you can click generate button
            below and ai will generate a summary based on your information from
            the form.
          </p>
        </div>
        <div className="w-full mt-4">
          <Textarea className=" border-black"/>
        </div>
      </Card>
    </div>
  );
};

export default Ai;