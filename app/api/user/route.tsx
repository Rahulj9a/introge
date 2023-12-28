import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: NextRequest) {
    const namequery = req.nextUrl.searchParams.get("username")
    if(namequery)
     try {

        const user = await prisma.user.findMany({
            where: {
                username: { contains: namequery as string },
             },
            
        }
        )
        if (user) {
            return NextResponse.json(user)
        }
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 404 })
    }
}