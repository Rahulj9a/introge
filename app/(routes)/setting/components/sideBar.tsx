"use client"
import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Edit, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

const SideBar = () => {
    const routes = [
        {
            label: "Edit Profile",
            icon: Edit,
            href: "/setting/profile",
            color: "text-sky-500",
        },
        {
            label: "Sections",
            icon: LayoutList,
            href: "/setting/section",
            color: "text-sky-500",
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
            <Link className="w-full md:hidden h-fit p-2 flex items-center gap-4 justify-center border-2 hover:bg-light cursor-pointer" href="/">
                <Image width={50} height={50} src="/profiley.png" alt="Profiley" className="" />
                <span className="text-darkest font-bold text-2xl">Profiley</span>
            </Link>
        </div>
    );

};

export default SideBar;
