import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET(req:NextApiRequest){

    
    try {
        const user = await prisma?.user.findMany({
            include:{
                socials:true
            }
        }
        )
        if(user){
            return NextResponse.json(user)
        }
    } catch (error) {
        return  new NextResponse("Something went wrong", {status:404})
    }
}