import { serverAuth } from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(req: Request, { params }: { params: { username: string, sectionId: string } }) {
    const { currentUser } = await serverAuth()
    if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }
    if (currentUser.username !== params.username) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }
    const section = await prisma.section.findUnique({
        where: {
            userid: currentUser.id,
            id: params.sectionId
        }
    })
    if (!section) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }

    try {
        const body = await req.json()
        const { name, about, isActive } = body

        if (!name) {
            return new NextResponse("Name is required", { status: 404 })
        }
        if (!about) {
            return new NextResponse("About is required", { status: 404 })
        }
        const isSectionExist = await prisma.section.findFirst({
            where: {
                userid: currentUser.id,
                name
            }
        })
        if (isSectionExist?.id !== params.sectionId) {
            return new NextResponse("Name is already used to create another section", { status: 404, })

        }
        const section = await prisma.section.update({
            where: {
                userid: currentUser.id,
                id: params.sectionId,
            },
            data: {
                name,
                about,
                isActive
            }
        })
        return NextResponse.json(section);
    } catch (error) {
        console.log("Section_post", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: { username: string, sectionId: string } }) {
    const { currentUser } = await serverAuth()
    if (!currentUser) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }
    if (currentUser.username !== params.username) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }
    const section = await prisma.section.findUnique({
        where: {
            userid: currentUser.id,
            id: params.sectionId
        }
    })
    if (!section) {
        return new NextResponse("Unauthenticated", { status: 400 });
    }

    try {
        await prisma.section.delete({
            where: {
                userid: currentUser.id,
                id: params.sectionId,
            },

        })
        return new NextResponse("Section Deleted", { status: 200 })
    } catch (error) {
        console.log("Section_post", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}