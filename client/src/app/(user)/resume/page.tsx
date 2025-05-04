"use client"
import React from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { useRouter } from "next/navigation";

const Resume = () => {
  const router = useRouter()

  const handleNewResume = () => {
    router.push("/resume/builder")
  }

  const handleAiResume = () => {
    router.push("/templates")
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Create Your Resume</h1>
      
      <div className="flex flex-wrap gap-8 justify-center">
        {/* New Resume Card */}
        <div 
          className="flex items-center justify-center border shadow-xl rounded-md border-black w-64 h-80 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={handleNewResume}
        >
          <div className="flex flex-col items-center justify-center w-40 h-40 rounded-full border border-black border-dashed">
            <Plus className="w-8 h-8 mb-2" />
            <span className="font-sans font-bold text-lg">New Resume</span>
            <p className="text-sm text-gray-600 text-center mt-2">Create a resume from scratch</p>
          </div>
        </div>

        {/* AI Resume Card */}
        <div 
          className="flex items-center justify-center border shadow-xl rounded-md border-black w-64 h-80 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors cursor-pointer"
          onClick={handleAiResume}
        >
          <div className="flex flex-col items-center justify-center w-40 h-40 rounded-full border border-purple-400 border-dashed">
            <Sparkles className="w-8 h-8 mb-2 text-purple-600" />
            <span className="font-sans font-bold text-lg">AI Resume</span>
            <p className="text-sm text-gray-600 text-center mt-2">Generate a professional resume with AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume