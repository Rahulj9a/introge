"use client"

import LoginModal from "@/components/modals/auth/login"
import RegisterModal from "@/components/modals/auth/register"
import { useLoginModal } from "@/hooks/useLoginModal"
import { useRegisterModal } from "@/hooks/useRegisterModal"
 
import { useEffect, useState } from "react"


export const ModalProvider = () => {
    //will ensure no hydration error
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => { setIsMounted(true) }, [])
    if (!isMounted) {
        return null
    }
    

    //but if we are on client side it will render the login/registerstore modal (until we want)-
    return (
        
        <>
            
                <LoginModal   />
                <RegisterModal  />
          
        </>
    )
}