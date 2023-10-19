 
 

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
   
    try {
      const { userEmail,name,username, } =await req.json();
       
     
         
      const user = await prisma.user.create({
        data: {
          email:userEmail,
        
           
          name,
          username
        },
      });
       
      return NextResponse.json(user) ;
    } catch (error) {
      console.log(error,"REGISTER_API")
      return new NextResponse("internalError", {status:500});
    }
    
  }