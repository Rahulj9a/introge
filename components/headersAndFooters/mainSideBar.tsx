"use client"
import React, { ReactComponentElement, ReactElement, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SubNav from "./mainSubNav";
import { Section, User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface ProfileSidebarProps {

}

const Sidebar: React.FC<ProfileSidebarProps> = ({ }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (

        <Sheet>
            <SheetTrigger>
                <div className="fixed right-20 bg-mid  block top-2 p-2 rounded-lg z-30 hover:bg-gray-200" >
                    <Menu className="w-4 " />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="bg-mid px-4 flex flex-col justify-between w-52 md:w-64 text-sm md:text-base">
                <SubNav />
                <Link className="w-full h-fit p-2 flex items-center justify-center gap-4 hover:bg-light cursor-pointer" href="/">
                    <Image width={50} height={50} src="/profiley.png" alt="Profiley" className="" />
                    <span className="text-darkest font-bold text-2xl">Profiley</span>
                </Link>
            </SheetContent>
        </Sheet>

    );
};

export default Sidebar;