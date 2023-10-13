 
import NextAuth  from "next-auth";
import { authOptions } from "@/conf/nextauth.config";

 

const handler = NextAuth(authOptions);
  
 
export {handler as GET,handler as POST}