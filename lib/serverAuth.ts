//this function checks if the user is signed in and retrieves the current user's information from the database using Prisma.

/* import { NextResponse } from "next/server"; */
import {getServerSession} from "next-auth/next";

import prisma from "@/lib/prismadb";
import { authOptions } from "@/conf/nextauth.config";
 
 
/* import { getSession } from "next-auth/react"; */

export async function serverAuth() {
  const session = await getServerSession(authOptions);
 
 
  if (!session?.user?.email) {
    return {currentUser:null}
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
    
  if (!currentUser) {
    return {currentUser:null}
  }

  return { currentUser:currentUser || null };
}