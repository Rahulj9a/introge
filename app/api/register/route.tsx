 
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
   
    try {
      const { email,name,username, password } =await req.json();
       
      const hashedPassword = await bcrypt.hash(password, 12);
         
      const user = await prisma.user.create({
        data: {
          email,
          hashedPassword,
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
  export async function PATCH(req:Request) {
    try {
      const { email,name,username, password } =await req.json();
       
      const hashedPassword = await bcrypt.hash("Rahul&2131@", 12);
         
      const user = await prisma.user.update({
        where:{
          username:"rahulj9a"
        },
        data: {
          
          hashedPassword,
        
          
        },
      });
       
      return NextResponse.json(user) ;
    } catch (error) {
      console.log(error,"REGISTER_API")
      return new NextResponse("internalError", {status:500});
    }

  }