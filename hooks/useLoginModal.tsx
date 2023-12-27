import { create } from "zustand";

interface UseLoginModalProps{
    isOpen:true|false
    onClose:()=>void
    onOpen:()=>void
}

export const UseLoginModal = create<UseLoginModalProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),

}))