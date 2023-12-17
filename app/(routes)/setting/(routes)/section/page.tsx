import React from "react";
import Sectioncard from "./components/sectioncard";
import prisma from "@/lib/prismadb";
import { serverAuth } from "@/lib/serverAuth";
import { redirect } from "next/navigation";

const Page = async () => {
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    redirect("/");
  }
  const sections = await prisma.section.findMany({
    where: {
      userid: currentUser.id,
    },
  });
   return (
    <div className="p-5">
{/*       <div className="w-full rounded-lg flex flex-col gap-2 h-fit bg-mid py-6 px-4">
        <p>Priority Order* :</p>
        <p className="text-[10px] text-dark">
          Any section with skills template will be shown at top
        </p>

        <div className="flex flex-wrap gap-2">
          {sectionsOrder?.map((sectionname) => (
            <div className="bg-light text-dark py-3 px-2 rounded-md">
              {sectionname}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-dark">
          *Last updated         
          </p>
      </div>*/}      
      <p className="text-dark">Edit or Add new Section</p>
       <Sectioncard />
      {sections
        ? sections.map((section) => (
          <Sectioncard key={section.id} data={section} user={currentUser} />
        ))
        : null}
    </div>
  );
};

export default Page;
