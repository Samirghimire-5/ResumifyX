"use client"
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Summary = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Summary</p>
        <p className="font-light text-sm">
          Write a short introduction for your resume
        </p>
      </div>

      <Textarea placeholder="Write something...." />

      <Button type="submit">Next</Button>
    </div>
  );
};

export default Summary;
