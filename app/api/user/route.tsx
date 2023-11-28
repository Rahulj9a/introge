import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const searchquery = req.nextUrl.searchParams.get("q")

    try {

        const user = await prisma?.user.findMany({
            where: {
                OR: [{username: {contains: searchquery as string}},
                    {name: {contains: searchquery as string}}
                ]
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