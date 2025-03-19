"use client"
import React from 'react'
import InputSec from '@/components/resumeInput'
import PreviewSec from '@/components/preview'
import { DayPickerProvider } from 'react-day-picker';

const Builder = () => {
  return (
    <div className="flex items-center justify-between h-full w-full">
      {/* <DayPickerProvider> */}
        <InputSec />
      {/* </DayPickerProvider> */}
      <PreviewSec />
    </div>
  )
}

export default Builder