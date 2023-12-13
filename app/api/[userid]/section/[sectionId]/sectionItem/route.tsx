import { serverAuth } from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { userid: string, sectionId: string } }) {
    const { currentUser } = await serverAuth()
    if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }
    if (currentUser.id !== params.userid) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }

    try {
        const body = await req.json()
        const { name, about, url, imageURL, labels, otherURLs } = body
        
        if (!name) {
            return new NextResponse("Name is required", { status: 404 })
        }
        
         
        
        const section = await prisma.sectionItem.create({

            data: {
                userid: currentUser.id,
                sectionid:params.sectionId,
                name,
                about,
                url,
                imageURL,
                labels,
                otherURLs
            }
        })
        return NextResponse.json(section);
    } catch (error) {
        console.log("SectionItem_post", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}