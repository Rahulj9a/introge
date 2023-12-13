import { serverAuth } from "@/lib/serverAuth";
import  prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{ userid:string }}){
    try{
        const {currentUser} = await serverAuth()
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        const body = await req.json()
        const {profilepic, name, bio, labels, socials, username} = await body
        
         if(!params.userid){
            return new NextResponse("Username is required")
        }
        if(currentUser.id!== params.userid){
            return new NextResponse("Permission not granted",{status:401})
        }
        const user = await prisma.user.update({
            where:{
                id:currentUser.id,
                 
            },
            data:{
                name, bio, profilepic,labels,socials, username
            }
        })

        if(user){
            return new NextResponse( user as any,{status:200})
        }
        

    }catch(error:any){
        console.log("[Billboard_patch]", error)
        return new NextResponse('internal error',{status:500})
    }
}