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
    <div onClick={() => router.push(`/${data.username}`)}
      className="cursor-pointer p-2 max-w-[350px] h-[150px] rounded-md bg-dark shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] shadow-black">
      <div
        className=" w-full flex-1 flex gap-2 h-5/6"
      >
        <div className="flex flex-col justify-around items-center w-auto">
          <Image
            width={100}
            height={100}
            src={data.profilepic as string}
            alt={data.username}
            className="rounded-full w-16 h-16 object-contain"
          />
        </div>
        <div className=" flex-1 px-1 py-1  flex flex-col justify-around text-light">
          <p className="text-light truncate max-w-full">
            {data.name}{" "}
            <span className="text-light text-xs">@{data.username}</span>
          </p>

          <p className="text-xs w-[180px] text-ellipsis">{data.bio}</p>
        </div>
      </div>
      <div className="flex flex-wrap bg-light rounded-sm px-2 py-1 gap-[2px] h-auto ">
        {data.labels &&
          data.labels.map(
            (label: string, index: number) =>
              index < 3 && (
                <div
                  key={label}
                  className=" text-[10px]  text-darkest"
                >
                  {label} |
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default UserCard;
