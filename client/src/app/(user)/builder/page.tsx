"use client"
import React, { useState } from 'react'
import InputSec from '@/components/resumeInput'
import PreviewSec from '@/components/preview'
import { DayPickerProvider } from 'react-day-picker';

const Builder = () => {
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)
  return (
    <div className="flex items-center justify-between h-full w-full">
      {/* <DayPickerProvider> */}
        <InputSec setPreviewPhoto={setPreviewPhoto}/>
      {/* </DayPickerProvider> */}
      <PreviewSec previewPhoto={previewPhoto}/>
    </div>
  )
}

export default Builder