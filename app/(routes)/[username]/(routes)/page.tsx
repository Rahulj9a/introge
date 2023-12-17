import React from "react";
import prisma from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

import PlatformFinder from "@/components/socialPlatformList";
import { cn } from "@/lib/utils";
import { BsThreeDots } from "react-icons/bs";
import SectionList from "./components/sectionsList";
import { Section } from "@prisma/client";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
       sections: true,
    },
  });
  if(user)
  return (
    <div className="w-full h-fit ">
      <div className=" md:grid md:grid-cols-3 flex flex-col min-w-full max-h-fit pb-5 md:h-screen min-h-[90vh] w-fit pt-16">
        {user.profilepic ? (
          <div className="flex items-center mt-5 md:mt-0 justify-center col-span-1">
            <Image
              src={user?.profilepic as string}
              width={100}
              height={100}
              className=" shadow-[rgba(17,_17,_26,_0.1)_0px_0px_30px]  inset-0 spread-x-4 shadow-mid rounded-full lg:w-80 lg:h-80 md:w-60 md:h-60 w-48 h-48  fill"
              alt={user?.name as string}
            />
          </div>
        ) : null}
        <div
          className={cn(
            " px-2 flex flex-1 flex-col md:pr-10 text-center items-center justify-around",
            user.profilepic ? "col-span-2" : "col-span-3"
          )}
        >
          <p className="text-sm my-1 ">Hey I am</p>

          <p className="text-6xl my-5  text-light">
            {user?.name}{" "}
            <Link
              href={`/${user.username}`}
              className="text-xs  hidden md:block text-dark"
            >
              @{user?.username}
            </Link>
          </p>

          <p className="  my-2  flex justify-center items-center  w-5/6 max-h-[100px]">
            {user.bio}
          </p>

          {user.labels.length > 0 ? (
            <div className="my-3 flex items-center justify-center gap-2 flex-wrap  max-h-[100px]">
              {[...user.labels].slice(0, 4).map((label) => (
                <div
                  key={label}
                  className="py-1 px-2 rounded-3xl bg-mid text-darkest text-xs md:text-sm"
                >
                  {label}
                </div>
              ))}
              {user.labels.length > 5 ? <BsThreeDots /> : null}
            </div>
          ) : null}

          <div className="my-3 px-3 md:px-6">
            <div className="  max-w-full gap-3 md:gap-7 flex flex-wrap items-center justify-center">
              {user.socials
                ? [...JSON.parse(String(user.socials))].map((social) => (
                  <Link
                    href={social.url}
                    target="_blank"
                    className="rounded-full bg-light p-2  border-mid hover:scale-105 shadow-mid  shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] w-10 h-10"
                    key={social.url}
                  >
                    <PlatformFinder social={social as any} />
                  </Link>
                ))
                : null}
            </div>
          </div>

        </div>
      </div>
      {user.sections.length > 0 ? (
        <SectionList sections={user.sections as any} />
      ) : null}
    </div>
  );
};

export default ProfilePage;
