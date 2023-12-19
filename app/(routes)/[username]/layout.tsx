 
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import prisma from "@/lib/prismadb"
 import ProfileSidebar from "./components/sidebar";
import Error from "next/error";
import { Button } from "@/components/ui/button";

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
        include:{
            sections:true
        }

    })

    if(!user){
        return <div className="w-full h-full flex items-center justify-center pt-20 text-dark">
            <p>404 | Page can't be found</p>
            <a href="/" className="px-4 py-2 rounded-md bg-darkest text-mid">GO HOME</a>
            </div>
    }
    return (
        <div>
            <div className="absolute pt-14">
                <ProfileSidebar user={user} sections={user.sections as any}/>
            </div>
            <main style={{backgroundColor:user.backgroundColor || "#01161E", color:user.textColor || "#CFE3E9"}}>
                {children}
            </main>
        </div>
    );
};

export default layout;