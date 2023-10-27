 
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import prisma from "@/lib/prismadb"
 import ProfileSidebar from "./components/sidebar";

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

    })
    if (!user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                User can't be found
            </div>
        )
    }
    return (
        <div>
            <div className="absolute pt-14">
                <ProfileSidebar />
            </div>
            <main className="bg-darkest text-mid ">
                {children}
            </main>
        </div>
    );
};

export default layout;