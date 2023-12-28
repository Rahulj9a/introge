"use client"

import React from "react"
import { Button } from "@/components/ui/button"


import { useLoginModal } from "@/hooks/useLoginModal"


import { useRouter } from "next/navigation"
import HeaderUserAvatar from "./headerUserAvatar"
import Image from "next/image"




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
 




    return (
        <div className="h-10 fixed z-30 bg-mid bg-opacity-90 w-[100vw] flex pr-4 pl-1 py-2 items-center lg:px-6 border-b justify-between">
            <div className="cursor-pointer hover:scale-105" onClick={()=>router.push("/")}>
                <Image width={100} height={100} className="w-7 h-7" src="/introge.png" alt="introge" />
            </div>
            <div className="hidden md:block">

                <SubNav />
            </div>
            <div className="flex items-center">

                {currentUser ?
                    <HeaderUserAvatar currentUser={currentUser} />

                    :
                    <div className="flex space-x-4">
{/*                         <Button variant="outline" onClick={() => loginModal.onOpen()}>Login</Button>
 */}                        <Button className="h-6" variant="outline" onClick={() => loginModal.onOpen()}>Join</Button>
                    </div>}

            </div>
        </div>

    )
}

export default Navbar