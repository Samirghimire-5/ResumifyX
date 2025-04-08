"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSkills } from "@/lib/redux/resumeData/resumeDataSlice";
import { ChevronRight } from "lucide-react";
import { debounce } from "lodash";

const Skills = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const initialSkills = useSelector((state: any) => state.resumeData.skills);
  const [textValue, setTextValue] = useState("");

  // Initialize local state from Redux once
  useEffect(() => {
    if (Array.isArray(initialSkills)) {
      setTextValue(initialSkills.join(", "));
    }
  }, [initialSkills]);

  // Debounced dispatch function
  const debouncedDispatch = useCallback(
    debounce((value: string) => {
      const cleaned = value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      dispatch(setSkills(cleaned));
    }, 600),
    []
  );

  // Handle textarea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setTextValue(newValue);
    debouncedDispatch(newValue);
  };

  // Final dispatch when going to next form
  const handleNext = () => {
    const cleaned = textValue
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    dispatch(setSkills(cleaned));
    setActiveForm("Projects");
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
          value={textValue}
          onChange={handleChange}
        />
        <p className="font-light font-sans text-sm">
          Separate each skill with a comma.
        </p>
      </div>

      <Button type="button" onClick={handleNext}>
        Next <ChevronRight />
      </Button>
    </div>
  );
};

export default Skills;
