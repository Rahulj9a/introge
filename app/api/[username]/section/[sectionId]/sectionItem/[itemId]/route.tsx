import prisma from "@/lib/prismadb"
import { serverAuth } from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { username: string, sectionId: string, itemId:string } }) {
    const { currentUser } = await serverAuth()
    if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }
    if (currentUser.username !== params.username) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }
     
    try {
        await prisma.sectionItem.delete({
            where: {
                userid: currentUser.id,
                sectionid: params.sectionId,
                id:params.itemId
            },

        })
        return new NextResponse("Section Deleted", { status: 200 })
    } catch (error) {
        console.log("Section_post", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}