import React from "react";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { Section } from "@prisma/client";


const SectionLayout = async ({
    params,
}: {
    params: { username: string, sectionname: string };
}) => {
    const user = await prisma.user.findUnique({
        where: {
            username: params.username
        }, include: {
            sections: true
        }
    })
    if (!user) {
        redirect("/")
    }
    const sectionname = params.sectionname


    const section = await prisma.section.findFirst({
        where: {
            userid: user.id,
            name: sectionname
        },

    });
    if (!section){
        redirect(`/${params.username}`)
    }



        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    {section?.name}
                </div>
            </div>
        );
};

export default SectionLayout;