'use client'

import React from 'react'
import { Button } from '../ui/button'

import UserAvatar from '../userAvatar'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
 




interface NavbarProps {
    currentUser?:{
        id:string
        name:string
        username:string
        profilepic:string
    }
}

const Navbar: React.FC<NavbarProps> = ( {currentUser }) => {
   
     
    const router = useRouter()

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
     

  


    return (
        <div className='h-14 sticky w-full flex px-4 py-2 items-center lg:px-6 border-b justify-between'>
            <div className=''>

            </div>
            <div className='flex items-center'>

                {currentUser ? <div onClick={()=>signOut()}>

                     <UserAvatar username={currentUser.username}  userPic={currentUser?.profilepic} />
                </div> :
                    <div className='flex space-x-4'>
                        <Button variant='outline' onClick={() => router.push("/sign-in")}>Login</Button>
                        <Button variant='outline' onClick={() => router.push("/sign-up")}>Register</Button>
                        <Button variant='outline' onClick={()=> router.push("/sign-out")}>Logout</Button>
                    </div>}

            </div>
        </div>
    )
}

export default Navbar