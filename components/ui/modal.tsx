"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModalProps {
    title:string;
    description:string;
    isOpen:boolean;
    onClose:()=>void;
    children?:React.ReactNode

}

const Modal: React.FC<ModalProps>=({
    title,
    description,
    onClose,
    isOpen,
    children
})=>{
    const onChange = (open:boolean)=>{
        if(!open){
            onClose()
        }
    }
    return(
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className="max-h-[90vh] scroll-smooth max-w-[90vw]">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default Modal;