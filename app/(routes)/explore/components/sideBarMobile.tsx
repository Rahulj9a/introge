"use client"
import React, { useEffect, useState } from "react";
import { Menu, } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sideBar";


const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (

        <Sheet >
            <SheetTrigger>
                <div className="md:hidden h-10 w-10 flex items-center justify-center z-30 " >
                    <Menu className="w-10 hover:scale-105" />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden p-0 w-48">
                <SideBar />
            </SheetContent>
        </Sheet>

    );
};

export default MobileSidebar;