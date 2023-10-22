import { serverAuth } from "@/lib/serverAuth";
import  prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req:Request, {params}:{params:{ username:string }}){
    try{
        const {currentUser} = await serverAuth()
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        const body = await req.json()
        console.log(body)
        const {userId, platform, platformUsername, url} = await body
        
        const username = params.username
        if(!username){
            return new NextResponse("Username is required")
        }
        if(currentUser.username!== username){
            return new NextResponse("Permission not granted",{status:401})
        }
        const social = await prisma.social.create({
            data:{
                userid:userId,
                platform:platform,
                username:platformUsername,
                url:url
            }
        })

        if(social){
            return new NextResponse( social as any,{status:200})
        }
        

    }catch(error:any){
        console.log("[Social_Push]", error)
        return new NextResponse('internal error',{status:500})
    }
}