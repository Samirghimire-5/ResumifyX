"use client"
import React from 'react'
import {Button} from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { useRouter } from "next/navigation";


const Resume = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/resume/builder")
  }

  return (
    <div className=' flex items-center justify-center border shadow-xl rounded-md border-black mt-8 w-52 h-72 bg-gray-200' onClick={() => handleClick()}>
      <div className='flex flex-col items-center justify-center w-32 h-32 rounded-full border border-black border-dashed'>
        <Plus className='bold'/><span className='font-sans font-bold text-md'>New resume</span>
      </div>
    </div>
  )
}

export default Resume
