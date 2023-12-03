import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const namequery = req.nextUrl.searchParams.get("username")||""
    const labelsquery = req.nextUrl.searchParams.get("labels")
    const labels = labelsquery?.split(",")||[]
    try {

        const user = await prisma?.user.findMany({
            where: {
                username: { contains: namequery as string },
                labels: {
                    hasEvery: labels

                        
 
                }
            },
            include: {
                socials: true
            }
        }
        )
        if (user) {
            return NextResponse.json(user)
        }
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 404 })
    }
}