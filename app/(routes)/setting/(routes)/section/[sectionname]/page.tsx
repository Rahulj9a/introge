import React from "react";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
 
import { serverAuth } from "@/lib/serverAuth";
import SectionForm from "./components/sectionForm";
import SectionItemForm from "./components/sectionItemForm";
 

interface SectionLayoutProps {
  params: {
    sectionname: string;
  };
  children: React.ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = async ({
  params,
  children,
}) => {
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    redirect("/");
  }
  const sectionname = params.sectionname;
  if (sectionname === "new") {
    return (
      <div className="p-10">
        <h1 className="font-semibold text-4xl mb-3">Build a new section</h1>

        <SectionForm currentUser={currentUser} />
      </div>
    );
  }

  const section = await prisma.section.findFirst({
    where: {
      userid: currentUser.id,
      name: sectionname,
    },
    include: {
      SectionItems: true,
    },
  });
  if (!section) {
    redirect("/section")
  }

  return (
    <div className="py-10 px-5">
      <h1 className="font-semibold text-2xl mb-3">Edit {section?.name} Section</h1>
      <SectionForm initialData={section as any} currentUser={currentUser} />
      <h2 className="font-semibold text-xl my-3">Items</h2>
      <SectionItemForm sectionId={section.id} currentUser={currentUser} sectionTemplate={section.template} sectionItems={section.SectionItems} />
    </div>
  );
};

export default SectionLayout;