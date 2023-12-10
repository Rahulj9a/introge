import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prismadb";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    //@ts-ignore
    async signIn({ profile }) {
      
      try {
        const usersNumber = await prisma.user.count();
        const userExist = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });
        if (!userExist) {
          const user = await prisma.user.create({
            data: {
              email: profile?.email as string,
              username: `${profile?.name}${usersNumber + 1}`,
              name: profile?.name,
            },
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export { authOptions };
