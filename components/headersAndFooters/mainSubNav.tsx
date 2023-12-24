"use client"
import { cn } from '@/lib/utils';
import { Home, LayoutList, Rocket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { MdPersonSearch } from "react-icons/md";


const SubNav = () => {
    const routes = [
        {
            label: "People",
            icon: MdPersonSearch,
            href: "/explore/people",
            color: "text-sky-500",
        },
        {
            label: "Sections",
            icon: LayoutList,
            href: "/explore/sections",
            color: "text-sky-500",
        },
       /*  {
            label: "Get started",
            icon: Rocket,
            href: "/getStarted",
            color: "text-sky-500",
        }, */
         
    ]
    const pathname = usePathname();
    return (
        <div className='flex flex-col gap-4 '>
            <div className="px-3 py-1 flex-1">

                <div className=" items-center justify-center flex-col md:flex-row gap-2 flex flex-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={`group flex p-3 w-full md:w-fit justify-start font-medium cursor-pointer hover:bg-light ${pathname === route.href
                                ? " text-darkest  bg-light/50 md:bg-transparent "
                                : "text-dark "
                                } rounded-lg transition`}
                        >
                            <div className="flex justify-center items-center  md:text-sm">
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