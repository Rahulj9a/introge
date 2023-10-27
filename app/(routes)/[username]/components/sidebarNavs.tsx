"use client"
import React from "react";
 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

const SideBarNav = () => {
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


        <nav className="space-y-4  flex flex-col h-full w-full pt-10 bg-mid text-darkest">
            <div className="px-3 py-2 flex-1">
                 
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
            </div>
        </nav>
    );

};

export default SideBarNav;