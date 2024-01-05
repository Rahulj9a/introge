"use client"
import { Button } from '@/components/ui/button'
import { useLoginModal } from '@/hooks/useLoginModal'

const JoinNow = ({ className }: { className?: string }) => {
  const loginModal = useLoginModal()
  return (

    <Button className={`bg-mid h-full w-full text-dark hover:bg-brand  ${className}`} onClick={() => loginModal.onOpen()}>
      Join Now
    </Button>

  )
}

export default JoinNow