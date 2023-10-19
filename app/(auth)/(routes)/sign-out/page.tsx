"use client"
import { useAuth, useClerk } from '@clerk/nextjs'

export default function SignOutPage(){
    const {signOut} = useClerk()
    const user = useAuth()
     
    if(user){
    signOut()
    }
     
    
}