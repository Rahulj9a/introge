"use client"
import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Edit, ExternalLink, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, User } from "@prisma/client";
import { TemplateFinder, templateList } from "@/components/templates/templateList";
import UserAvatar from "@/components/userAvatar";

interface sidebarNavsProps {
    user: User,
    sections?: Section[]
}

const SideBarNav: React.FC<sidebarNavsProps> = ({ user, sections }) => {
    const sectionRoutes = [] as any

    sections?.forEach(section => {
        if (section.isActive) {
            sectionRoutes.push({
                label: section.name,
                icon: [...templateList].find((template) => template.label === section.template)?.icon || ExternalLink,
                href: `/${user.username}/${section.name}`,
                color: [...templateList].find((template) => template.label === section.template)?.color || "text-darkest",
            })
        }
    });
    const routes = [
         ...sectionRoutes

    ];

    const pathname = usePathname();
    return (


        <nav className="space-y-4  flex flex-col h-full w-full pt-10 bg-mid text-darkest">
            <div className="px-3 py-2 flex-1">

                <div className="space-y-1">
                    <Link href={`/${user.username}`}><UserAvatar username={user.username} name={user.name as string} userPic={user.profilepic as string} /></Link>
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
            <Link className="w-full h-fit p-2 flex items-center justify-center gap-4 hover:bg-light cursor-pointer" href="/">
                <Image width={50} height={50} src="/profiley.png" alt="Profiley" className=""/>
                <span className="text-darkest font-bold text-2xl">Profiley</span>
            </Link>
        </nav>
    );

};

export default SideBarNav;