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
                <div className=" bg-slate-400  block p-1 rounded-lg z-30 hover:bg-gray-200" >
                    <Menu className="h-8 w-8" />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="bg-mid px-4 flex flex-col justify-between w-52 md:w-64 text-sm md:text-base">
                <SubNav />
                <Link className="w-full h-fit p-2 flex items-center justify-center gap-4 hover:bg-light cursor-pointer" href="/">
                    <Image width={50} height={50} src="/introge.png" alt="Introge" className="" />
                    <span className="text-darkest font-bold text-2xl">Introge</span>
                </Link>
            </SheetContent>
        </Sheet>

    );
};

export default Sidebar;