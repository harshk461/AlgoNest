'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function View({row}) {
    const navigate=useRouter();
  return (
    <button 
    onClick={()=>navigate.push(`/roadmap/all-topics/${row.id}`)}
    className='px-4 py-2 rounded-lg border border-blue-500 text-blue-500 font-bold'>View</button>
  )
}
