"use client"
import React, { useState } from 'react'
import InputSec from '@/components/resumeInput'
import PreviewSec from '@/components/preview'
import NameAndDownload from '@/components/nameAndDownload'
import { useSelector } from 'react-redux'

const Builder = () => {
  const resume = useSelector((state: any) => state.resumeData);

  return (
    <div className="flex flex-col gap-5 w-full p-5">
        <div className='w-full'>
          <NameAndDownload/>
        </div>
        <div className='flex items-center justify-between h-full w-full'>
          <InputSec />
          <PreviewSec resume={resume}/>
        </div>

    </div>
  )
}

export default Builder