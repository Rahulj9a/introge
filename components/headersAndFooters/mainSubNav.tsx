"use client"
import { cn } from '@/lib/utils';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { MdPersonSearch } from "react-icons/md";


const SubNav = () => {
    const routes = [
        {
            label: "Explore",
            icon: MdPersonSearch,
            href: "/explore",
            color: "text-sky-500",
        },
        {
            label: "Get started",
            icon: Rocket,
            href: "/explore",
            color: "text-sky-500",
        },
         
    ]
    const pathname = usePathname();
    return (
        <div className='flex flex-col gap-4 '>
            <div className="px-3 py-1 flex-1">

                <div className="space-y-1 flex flex-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-light ${pathname === route.href
                                ? " text-darkest  bg-light/50 md:bg-transparent "
                                : "text-dark hover:"
                                } rounded-lg transition`}
                        >
                            <div className="flex text-center items-center flex-1 text-sm">
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