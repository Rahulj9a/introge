"use client"
import React from "react";

 import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Frame, LayoutList, User } from "lucide-react";
import { cn } from "@/lib/utils";
const SideBar = () => {
    const routes = [
        {
            label: "Peoples",
            icon: User,
            href: "/explore/people",
            color: "text-dark",
        },
       /*  {
            label: "Sections",
            icon: LayoutList,
            href: "/explore/sections",
            color: "text-dark",
        }, */
        {
            label: "Templates",
            icon: Frame,
            href: "/explore/templates",
            color: "text-dark",
        },



    ];
    const pathname = usePathname();
    return (


        <div className="space-y-4 pt-2 flex flex-col h-full justify-between bg-mid text-darkest">
            <div className="px-3 py-2 flex-1">
                <div className="relative w-1/2 h-auto mr-4  pl-3 mb-4 ">


                </div>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-light ${pathname === route.href
                                ? " text-darkest  bg-light/50"
                                : "text-dark hover:"
                                } rounded-lg transition`}
                        >
                            <div className="flex text-center items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
                <div>

                </div>
            </div>
            <Link className="w-full md:hidden h-fit p-2 flex items-center gap-4 justify-center hover:bg-light cursor-pointer" href="/">
                <Image width={50} height={50} src="/introge.png" alt="introge" className="" />
                <span className="text-darkest font-bold text-2xl">introge</span>
            </Link>
        </div>
    );

};

export default SideBar;
