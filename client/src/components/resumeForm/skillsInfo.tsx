"use client";
import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSkills } from "@/lib/redux/resumeData/resumeDataSlice";
import { Sparkles } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Skills = () => {
  const dispatch = useDispatch();
  const skillRef = useRef<HTMLTextAreaElement | null>(null);
  const userInfo = useSelector((state: any) => state.userData.user)
  const resume = useSelector((state: any) => state.resumeData)
  console.log({userId: userInfo._id, ...resume})

  const generate = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`, {
        userId: userInfo._id, 
        ...resume
      }, 
      {withCredentials: true}
    )
  
      if (response.status === 400) return toast.error(response.data.error)

      if (response.status === 200) {
        return toast.success(response.data.message)
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  const handleChange = () => {
    if (skillRef.current) {
      let skillArr = skillRef?.current?.value
        .split(",")
        .map((skill) => skill.trim());
      skillArr = skillArr.filter((skill) => skill !== "");
      const timer = setTimeout(() => {
        dispatch(setSkills(skillArr));
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

      <Button type="submit" className="bg-green-500 font-sans hover:bg-green-700"
      onClick={generate}
      >
        <Sparkles />
        Generate
      </Button>
    </div>
  );
};

export default Skills;
