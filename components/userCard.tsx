"use client";

import { User } from "@prisma/client";
import { UserIcon } from "lucide-react";
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
      className="cursor-pointer p-2 w-[160px] lg:w-[250px] hover:scale-105 h-[220px] rounded-md bg-dark shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] shadow-black">
      <div
        className=" w-full flex flex-col items-center gap-2  h-5/6"
      >
        <div className="flex justify-between   w-full">
          {data.profilepic ? <Image
            width={100}
            height={100}
            src={data.profilepic as string}
            alt={data.username}
            className="rounded-full w-16 h-16 object-contain"
          /> : <UserIcon className="w-16 h-16 rounded-full" />
          }
          <p className="text-light flex-1 text-center lg:text-lg max-w-full">
            {data.name}
            <br/>
            <span className="text-light text-xs truncate">@{data.username}</span>
          </p>
        
        </div>
        <div className=" flex-1 px-1 py-1  flex flex-col justify-around text-light">

          <p className="text-xs text-ellipsis">{data.bio}</p>
        </div>
      </div>
      <div className="flex flex-wrap bg-light rounded-sm px-2 py-1 gap-[2px] h-auto ">
        {data.labels &&
          data.labels.map(
            (label: string, index: number) =>
              index < 3 && (
                <div
                  key={label}
                  className=" text-[10px] lg:text-sm  text-darkest"
                >
                  {label + " • "} 
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default UserCard;
