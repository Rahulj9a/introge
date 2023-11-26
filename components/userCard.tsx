"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserCardProps {
  data: User;
}
const UserCard: React.FC<UserCardProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  if (!isMounted) {
    return null;
  }
  return (
    <div
      className="cursor-pointer w-full max-w-[350px] h-[150px] bg-dark rounded-md p-2 flex gap-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] shadow-black"
      onClick={() => router.push(`/${data.username}`)}
    >
      <div className="flex flex-col justify-around items-center w-[90px]">
        <Image
          width={100}
          height={100}
          src={data.profilepic as string}
          alt={data.username}
          className="rounded-full w-20 h-20 object-contain"
        />
        <p className="text-light text-xs">@{data.username}</p>
      </div>
      <div className=" flex-1 px-1 py-1  flex flex-col justify-around text-light">
        <p className="text-light truncate w-[180px]">{data.name}</p>

        <div className="flex flex-wrap gap-[2px]">
          {data.labels &&
            data.labels.map((label: string, index: number) => (
              index < 3 && <div className=" text-[10px] md:text-xs w-fit h-fit px-[2px] md:px-[3px] py-[1px] md:py-[2px] rounded-sm bg-light text-dark">
                {label}
              </div>
            ))}
        </div>
        <p className="text-xs w-[180px] text-ellipsis">{data.bio}</p>


      </div>
    </div>
  );
};

export default UserCard;
