"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Example = () => {
  // const [templates, setTemplates] = useState([])

  // useEffect(() => {
  //   const getTemplates = async () => {
  //     const allTemp = await axios.get('http://localhost:8000/api/templates')

  //     if (!allTemp) return toast('failed to get data')
  
  //     try {
  //       console.log(allTemp.data)
  //       setTemplates(allTemp.data)
  //     } catch (error) {
  //       console.log("error", error)
  //     }
  //   }
  //   getTemplates();
 
  // }, [])
  // console.log('state', templates)
  return (
    <div className='grid grid-cols-4 gap-2'>
      {/* {templates && templates.length > 0 && templates.map((template, index) => ( 
        <div 
        className='flex flex-col p-2 border border-black w-70 h-80'
        key={index}> 
          <p>{template.name}</p>
          <Image src={template.previewImage} width={100} height={100} alt='template image'/>
        </div>
      ))} */}
      Example
    </div>
  )
}

export default Example