"use client";
import React, { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSkills } from "@/lib/redux/resumeData/resumeDataSlice";
import { ChevronRight } from "lucide-react";

const Skills = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const skillRef = useRef<HTMLTextAreaElement>(null);
  const initialSkills = useSelector((state: any) => state.resumeData.skills);

  useEffect(() => {
    // Ensure initialSkills is an array before joining
    const skillsString = Array.isArray(initialSkills) 
      ? initialSkills.join(", ")
      : "";
    
    // Only update if ref exists and value is different
    if (skillRef.current && skillRef.current.value !== skillsString) {
      skillRef.current.value = skillsString;
    }
  }, [initialSkills]);

  const handleChange = () => {
    if (skillRef.current) {
      const skillArr = skillRef.current.value
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
      dispatch(setSkills(skillArr));
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
          defaultValue={Array.isArray(initialSkills) ? initialSkills.join(", ") : ""}
        />
        <p className="font-light font-sans text-sm">
          Separate each skill with a comma.
        </p>
      </div>
      <Button type="button" onClick={() => setActiveForm("Projects")}>
        Next <ChevronRight />
      </Button>
    </div>
  );
};

export default Skills;