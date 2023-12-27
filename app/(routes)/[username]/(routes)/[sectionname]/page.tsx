import React from "react";
import prisma from "@/lib/prismadb";
import SectionItem from "../components/sectionItem";
import Image from "next/image";
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
    return <div className="w-full h-[80vh] bg-white flex flex-col gap-6 items-center justify-center pt-20 text-dark">
      <Image alt="Page can't be founds" width={330} height={400} src="/404.avif" />
      <h1 className="font-bold text-xl">404 | Page can't be found</h1>
      <div className="flex gap-2">
        <a href={`/exlore/people`} className="px-4 py-2 rounded-md bg-darkest text-mid">Explore People</a>
      </div>
    </div>
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
  if (!sectionInfo || !sectionInfo.isActive) {
    return <div className="w-full h-[80vh] bg-white flex flex-col gap-6 items-center justify-center pt-20 text-dark">
      <Image alt="Page can't be founds" width={330} height={400} src="/404.avif" />
      <h1 className="font-bold text-xl">404 | Page can't be found</h1>
      <div className="flex gap-2">
        <a href={`/${user.username}`} className="px-4 py-2 rounded-md bg-darkest text-mid">Explore Profile</a>
      </div>
    </div>

  }

  return (
    <div className="w-full ">
      <div className=" min-w-full flex flex-col items-center pb-4 max-h-fit max-w-fit min-h-screen pt-10">
        <h1 className="font-bold text-3xl my-6">{sectionInfo.name}</h1>
        <div className="flex flex-wrap gap-2 items-center justify-center w-full">
          <SectionItem sectionPage={true} sectionItems={sectionInfo.SectionItems} sectionTemplate={sectionInfo.template} />
        </div>

      </div>
    </div>
  );
};

export default SectionPage;
