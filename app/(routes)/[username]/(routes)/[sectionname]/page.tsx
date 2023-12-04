import React from "react";
import prisma from "@/lib/prismadb";
import SectionItem from "../components/sectionItem";
interface SectionPageProps {
  params: {
    username: string;
    sectionname: string;
  };
}
const SectionPage: React.FC<SectionPageProps> = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
   });
  if (!user) {
    return <div>User can't be found</div>;
  }
  const sectionInfo = await prisma.section.findFirst({
    where: {
      userid: user.id,
      name: params.sectionname,
    },
    include: {
      SectionItems: true,
    },
  });
  if (!sectionInfo) {
    return <div>Section can't be found</div>;
  }

  return (
    <div className="w-full h-fit">
      <div className=" min-w-full flex flex-col items-center h-fit w-fit min-h-screen pt-14">
        <h1 className="font-bold text-3xl my-6">{sectionInfo.name}</h1>
        <div className="flex flex-wrap gap-4 items-center justify-start w-full">
          <SectionItem sectionPage={true} sectionItems={sectionInfo.SectionItems} sectionTemplate={sectionInfo.template} />
        </div>

      </div>
    </div>
  );
};

export default SectionPage;
