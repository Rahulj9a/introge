"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const router = useRouter()
  return (
    <>
    <div>AHA! Good to see you back. Let's continue</div>
    <Button onClick={()=>router.push("/")}>
        Continue
    </Button>
    </>
  )
}


export default Page