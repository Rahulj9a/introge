"use client"
import { Button } from '@/components/ui/button'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { ArrowRightSquare } from 'lucide-react'
import React from 'react'

const JoinNow = ({className}:{className?:string}) => {
    const loginModal = useLoginModal()
  return (
    <div className={`px-4 py-2 ${className}`}>
        <Button className='bg-mid h-full w-full text-dark hover:bg-brand' onClick={loginModal.onOpen}>
            Join Now
        </Button>
    </div>
  )
}

export default JoinNow