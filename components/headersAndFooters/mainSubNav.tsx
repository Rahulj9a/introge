"use client"
import { cn } from "@/lib/utils";
import { Compass, Home, LayoutList, Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react"
import { MdPersonSearch } from "react-icons/md";


const SubNav = () => {
    const routes = [
        {
            label: "Explore",
            icon: MdPersonSearch,
            href: "/explore/people",
            color: "text-darkest",
        },
        /* {
            label: "Discover Sections",
            icon: LayoutList,
            href: "/explore/sections",
            color: "text-sky-500",
        }, */
        {
            label: "Guide",
            icon: Compass,
            href: "/getStarted",
            color: "text-darkest",
        },
         
    ]
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-4 ">
            <div className="px-3 py-1 flex-1">

                <div className=" items-center px-3 py-1 justify-center flex-col md:bg-white md:rounded-md md:flex-row gap-4 md:gap-2 flex flex-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={`group flex py-1 px-2 w-full md:w-fit hover:border-b-mid justify-start font-medium cursor-pointer  ${pathname === route.href
                                ? " text-darkest "
                                : "bg:text-mid text-dark"
                                } transition border-b-[2px] border-b-transparent`}
                        >
                            <div className="flex justify-center items-center text-lg  md:text-sm">
                                <route.icon className={cn("h-6 w-6 mr-3 md:hidden", route.color)} />
                                <p>{route.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default SubNav