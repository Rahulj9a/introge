"use client"
import React from "react";
 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Edit } from "lucide-react";
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
            label: "abc",
            icon: Edit,
            href: "/setting/abc",
            color: "text-sky-500",
        },

    ];
    const pathname = usePathname();
    return (


        <div className="space-y-4  flex flex-col h-full bg-gray-100">
            <div className="px-3 py-2 flex-1">
                <div className="relative w-1/2 h-auto mr-4  pl-3 mb-4 ">
                    {/* <Link href="/home">
                        <Image
                            alt="Logo"
                            src="/logo.png"
                            className="w-full h-auto"
                            width={500}
                            height={500}
                        />
                    </Link> */}
                </div>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 ${pathname === route.href
                                    ? " text-gray-900  bg-white/10"
                                    : "text-zinc-400 hover:"
                                } rounded-lg transition`}
                        >
                            <div className="flex text-center items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default SideBar;
