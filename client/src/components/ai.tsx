'use client'
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Info, Sparkles, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSummary } from "@/lib/redux/resumeData/resumeDataSlice";

const Ai = ({ setShowAi }: any) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const resumeData = useSelector((state:any) => state.resumeData)
  const [textPrompt, setTextPrompt] = useState('')


  const handleClick = async () => {
    setLoading(true);
    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`, textPrompt ? {textPrompt} : {resumeData})
      dispatch(setSummary(data.generatedText))
      setLoading(false)
      setShowAi(false)

      if (!data) return toast.error("failed to generate") 
    } catch (error: any) {
      return toast.error(error.data.error)
    }
  }
  
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-xs z-50">
      <Card className="flex flex-col p-4 w-full max-w-md bg-white relative">
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          onClick={() => setShowAi(false)}
        >
          <X className="size-4" />
        </button>
        <p className="font-bold text-xl font-sans">Generate with ai</p>
        <div className="flex items-start w-full h-full mt-2">
          <span className="mr-2">
            <Info className="size-4" />
          </span>
          <p className="text-sm font-serif">
            You can either give ai your information and it will provide a
            summary for you based on your information or you can click generate
            button below and ai will generate a summary based on your
            information from the form.
          </p>
        </div>
        <div className="w-full mt-4">
          <Textarea onChange={(e) => setTextPrompt(e.target.value)} className="border-black" placeholder="Enter your text here..." />
        </div>
        <div className="w-full mt-4 flex justify-end">
          <Button disabled={loading} onClick={() => handleClick()}>
            {loading ? "Generating..." : (<><Sparkles />Generate</>)}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Ai;