import React from "react";
import prisma from "@/lib/prismadb";
import UserAvatar from "@/components/userAvatar";
import SectionCard from "@/components/sectionCard";
import { User } from "@prisma/client";
import { count } from "console";

const Page = async () => {
  const availSections = await prisma.section.findMany({
    where: {
      isActive: true,
    },
    include:{
      user:true,
    }
  });
  const findUser = async (id: string) => {
    const data = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return data
  }
  const findAvailItems = async (id: string) => {
    const sectionItems = await prisma.sectionItem.count({
      where: {
        sectionid: id
      }
    })
    return sectionItems
  }
  return (
    <section className="min-h-screen max-h-fit pb-8">
      <div className="mx-4 flex text-light flex-wrap mt-4 md:mx-8 gap-6 h-fit">
        {availSections.map( (section) => {
          return <SectionCard section={section} user={section.user}/>
        })}
      </div>
    </section>
  );
};

export default Page;
