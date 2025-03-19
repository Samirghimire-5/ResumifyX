"use client"
import React from 'react'
import {Button} from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { useRouter } from "next/navigation";


const Resume = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/builder")
  }

  return (
    <div className='mt-4'>
      <Button onClick={() => handleClick()}><Plus />Create a new resume</Button>
    </div>
  )
}

export default Resume
