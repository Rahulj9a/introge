"use client"
import React, { ReactComponentElement, ReactElement, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBarNav from "./sidebarNavs";
 

 
const ProfileSidebar  = ( ) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
         
            <Sheet>
                <SheetTrigger>
                    <Button className="absolute left-3 top-13" variant="outline" size="icon">
                        <Menu className="w-4 l-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent  side="left" className=" p-0 w-52 md:w-64 text-sm md:text-base">
                     <SideBarNav/>
                </SheetContent>
            </Sheet>
        
    );
};

export default ProfileSidebar;