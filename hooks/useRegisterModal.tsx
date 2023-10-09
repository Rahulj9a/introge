import { create } from "zustand";

interface UseRegisterModalProps{
    isOpen:true|false
    onClose:()=>void
    onOpen:()=>void
}

export const useRegisterModal = create<UseRegisterModalProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),

}))