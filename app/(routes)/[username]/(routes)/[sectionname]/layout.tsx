
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import prisma from "@/lib/prismadb"

interface LayoutProps {
    children: React.ReactNode;
    params: { username: string, sectionname:string }
}

const layout: React.FC<LayoutProps> = async ({ children, params }) => {
    
    const user = await prisma.user.findUnique({
        where: {
            username: params.username
        },
        include: {
            sections: true
        }

    })
    if (!user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                User can't be found
            </div>
        )
    }
    const sectionInfo = await prisma.section.findFirst({
        where:{
            userid:user.id,
            name:params.sectionname
        },
        
    })
    if (!sectionInfo) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                Section can't be found
            </div>
        )
    }
   
    return (
        <div>
            
            <main className="bg-darkest text-mid ">
                {children}
            </main>
        </div>
    );
};

export default layout;
