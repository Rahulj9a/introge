'use client'

import React from 'react'
import { Button } from '@/components/ui/button'


import { useLoginModal } from '@/hooks/useLoginModal'
import { useRegisterModal } from '@/hooks/useRegisterModal'



import { useRouter } from 'next/navigation'
import HeaderUserAvatar from './headerUserAvatar'
import Image from 'next/image'




interface NavbarProps {
    currentUser?: {
        id: string
        name: string
        username: string
        profilepic: string
    }
    SubNav?: any
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, SubNav }) => {



    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()





    return (
        <div className='h-14 fixed z-30 bg-mid bg-opacity-80 w-full flex pr-4 pl-1 py-2 items-center lg:px-6 border-b justify-between'>
            <div className='cursor-pointer' onClick={()=>router.push("/")}>
                <Image width={40} height={40} src="/profiley.png" alt="Profiley" />
            </div>
            <div className='hidden md:block'>

                <SubNav />
            </div>
            <div className='flex items-center'>

                {currentUser ?
                    <HeaderUserAvatar currentUser={currentUser} />

                    :
                    <div className='flex space-x-4'>
{/*                         <Button variant='outline' onClick={() => loginModal.onOpen()}>Login</Button>
 */}                        <Button variant='outline' onClick={() => registerModal.onOpen()}>Join</Button>
                    </div>}

            </div>
        </div>

    )
}

export default Navbar