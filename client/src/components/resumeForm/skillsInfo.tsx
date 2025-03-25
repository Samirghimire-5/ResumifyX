"use client";
import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { skills } from "@/lib/redux/resumeData/resumeDataSlice";
import { Sparkles } from "lucide-react";

const Skills = () => {
  const dispatch = useDispatch();
  const skillRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = () => {
    if (skillRef.current) {
      let skillArr = skillRef?.current?.value
        .split(",")
        .map((skill) => skill.trim());
      skillArr = skillArr.filter((skill) => skill !== "");
      const timer = setTimeout(() => {
        dispatch(skills(skillArr));
      }, 1000);
      return () => clearTimeout(timer);
    }
  };
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center font-serif">
        <p className="font-bold text-xl">Skills</p>
        <p className="font-light text-sm">Add your skills.</p>
      </div>

      <div className="w-full">
        <Textarea
          placeholder="Add skills..."
          ref={skillRef}
          onChange={handleChange}
        />
        <p className="font-light font-sans text-sm">
          Seperate each skill with a comma.
        </p>
      </div>

      <Button type="submit" className="bg-green-500 font-sans hover:bg-green-700">
        <Sparkles />
        Generate
      </Button>
    </div>
  );
};

export default Skills;
