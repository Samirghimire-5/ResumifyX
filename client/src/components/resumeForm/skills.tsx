"use client";
import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSkills } from "@/lib/redux/resumeData/resumeDataSlice";
import { ChevronRight, Save } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Skills = ({ setActiveForm }: any) => {
  const dispatch = useDispatch();
  const skillRef = useRef<HTMLTextAreaElement | null>(null);

  // console.log({ userId: userInfo._id, ...resume });

  const handleChange = () => {
    if (skillRef.current) {
      let skillArr = skillRef?.current?.value
        .split(",")
        .map((skill) => skill.trim());
      skillArr = skillArr.filter((skill) => skill !== "");
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
        />
        <p className="font-light font-sans text-sm">
          Seperate each skill with a comma.
        </p>
      </div>
      <Button type="submit" onClick={() => setActiveForm("Projects")}>
        Next <ChevronRight />
      </Button>
    </div>
  );
};

export default Skills;
