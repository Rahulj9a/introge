"use client"
import { Button } from '@/components/ui/button'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { ArrowRightSquare } from 'lucide-react'
import React from 'react'

const JoinNow = () => {
    const loginModal = useLoginModal()
  return (
    <div className='h-fit p-6 w-full'>
        <Button className='bg-mid h-40 w-full text-3xl text-dark hover:bg-brand' onClick={loginModal.onOpen}>
            Join Now <ArrowRightSquare className='mx-4 animate-bounce' width={30} height={30}/>
        </Button>
    </div>
  )
}

export default JoinNow