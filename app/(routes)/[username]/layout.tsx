
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import prisma from "@/lib/prismadb"
import ProfileSidebar from "./components/sidebar";
import Error from "next/error";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LayoutProps {
    children: React.ReactNode;
    params: { username: string }
}

const layout: React.FC<LayoutProps> = async ({ children, params }) => {
    let { currentUser } = await serverAuth();
    const user = await prisma.user.findUnique({
        where: {
            username: params.username
        },
        include: {
            sections: true
        }

    })

    if (!user) {
        return <div className="w-full h-[80vh] flex flex-col gap-6 items-center justify-center pt-20 text-dark">
            <Image alt="Page can't be founds" width={330} height={400} src="/404.avif"/>
            <h1 className="font-bold text-xl">404 | Page can't be found</h1>
            <div className="flex gap-2">
                <a href="/" className="px-4 py-2 rounded-md bg-darkest text-mid">Home</a>
                <a href="/explore/people" className="px-4 py-2 rounded-md bg-darkest text-mid">Discover Peoples</a>
             </div>
        </div>
    }
    return (
        <>
            <div className="absolute pt-10">
                <ProfileSidebar user={user} sections={user.sections as any} />
            </div>
            <main style={{ backgroundColor: user.backgroundColor || "#01161E", color: user.textColor || "#CFE3E9" }}>
                {children}
            </main>
        </>
    );
};

export default layout;