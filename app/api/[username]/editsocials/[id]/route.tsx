import { serverAuth } from "@/lib/serverAuth";
import  prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, {params}:{params:{ username:string, id:string }}){
    try{
        
        const {currentUser} = await serverAuth()
        if(!currentUser){
            return new NextResponse("Unauthenticated", {status:401})
        }
        const id = params.id
        if(!id){
            return new NextResponse("Social not defined", {status:401})
        } 
        const username = params.username
        if(!username){
            return new NextResponse("Username is required")
        }
        if(currentUser.username!== username){
            return new NextResponse("Permission not granted",{status:401})
        }
        const social = await prisma.social.deleteMany({
            where:{
                id
            }
        })

        
            return new NextResponse( social as any,{status:200})
         
        

    }catch(error:any){
        console.log("[Social_Delete]", error)
        return new NextResponse('internal error',{status:500})
    }
}