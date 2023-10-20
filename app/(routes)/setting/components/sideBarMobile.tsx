"use client"
import React, { ReactComponentElement, ReactElement, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./sideBar";

 
const MobileSidebar  = ( ) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button className="md:hidden absolute left-1 -top-12" variant="outline" size="icon">
                        <Menu className="w-4 l-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent  side="left" className="p-0 w-48">
                     <SideBar/>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileSidebar;