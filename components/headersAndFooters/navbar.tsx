'use client'

import React from 'react'
import { Button } from '../ui/button'

import UserAvatar from '../userAvatar'
import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'




interface NavbarProps {
    currentUser?:{
        id:string
        name:string
        username:string
        profilepic:string
    }
}

const Navbar: React.FC<NavbarProps> = ( {currentUser }) => {
   
     
    

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
     

  


    return (
        <div className='h-14 sticky w-full flex px-4 py-2 items-center lg:px-6 border-b justify-between'>
            <div className=''>

            </div>
            <div className='flex items-center'>

                {currentUser ? <div>

                     <UserAvatar username={currentUser.username}  userPic={currentUser?.profilepic} />
                </div> :
                    <div className='flex space-x-4'>
                        <Button variant='outline' onClick={() => loginModal.onOpen()}>Login</Button>
                        <Button variant='outline' onClick={() => registerModal.onOpen()}>Register</Button>
                    </div>}

            </div>
        </div>
    )
}

export default Navbar