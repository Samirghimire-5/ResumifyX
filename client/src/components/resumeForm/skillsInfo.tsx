"use client"
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Skills = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Skills</p>
        <p className="font-light text-sm">
          Add your skills.
        </p>
      </div>

      <div className="w-full">
        <Textarea placeholder="Add skills..." />
        <p className="font-light font-sans text-sm">Seperate each skill with a comma.</p>
      </div>
      <Button type="submit">Next</Button>
    </div>
  );
};

export default Skills;
