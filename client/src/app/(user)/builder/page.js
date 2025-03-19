"use client"
import React from 'react'
import InputSec from '@/components/resumeInput'
import PreviewSec from '@/components/preview'

const Builder = () => {
  return (
    <div className="flex items-center justify-between h-full w-full">
      <InputSec />
      <PreviewSec />
    </div>
  )
}

export default Builder