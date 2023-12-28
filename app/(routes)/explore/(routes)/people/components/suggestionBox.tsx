import React from "react";
import { User } from "@prisma/client";
import { UseUserSuggestion } from "@/hooks/useUserSuggestion";
import Image from "next/image";
import {  UserIcon } from "lucide-react";
import Link from "next/link";

interface SuggestionBoxProps {
  input?: string;
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ input = "" }) => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = UseUserSuggestion(input);
  if (isLoading && !error) {
    return (
      <div className="w-full h-fit bg-dark text-light text-center absolute rounded-lg p-2">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full  h-fit bg-dark text-light text-center rounded-lg p-2">
        Something went wrong
      </div>
    );
  }
  const users: User[] = response?.data;

  if (users.length == 0 && !isLoading && !error) {
    return (
      <div className="w-full h-fit bg-dark text-light text-center rounded-lg p-2">
        No result found
      </div>
    );
  }
  return (
    <>
      {
        <div className=" h-fit p-2 max-h-[300px] flex flex-col overflow-x-hidden overflow-y-auto bg-mid text-light rounded-lg">
          {users &&
            users
              ?.filter((e) => {
                const inputLowerCase =  (input as string).toLowerCase();
                const usernameLowerCase = e.username.toLowerCase()
                const nameLowerCase = e.name?.toLowerCase()
                if (
                  usernameLowerCase.includes(inputLowerCase) || nameLowerCase?.includes(inputLowerCase)
                ){
                  return true;
                }else{
                  return false
                }
              })
              .map((user: User) => (
                <Link
                  href={`/${user.username}`}
                  key={user.id}
                  className=" w-full rounded-md my-1 p-1 items-center gap-2 bg-light hover:bg-slate-100 cursor-pointer text-darkest flex"
                >
                  <div className="flex gap-2 items-center flex-1">
                    {user.profilepic ? (
                      <Image
                        width={50}
                        height={50}
                        className="object-contain w-8 h-8 rounded-full"
                        alt={user.name as string}
                        src={user.profilepic as string}
                      />
                    ) : (
                      <UserIcon className="w-8 h-8 rounded-full" />
                    )}
                    <p className="flex items-center flex-col lg:flex-row lg:gap-4">
                      <span>{user.name}</span>
                      <span className="text-xs">@{user.username}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap  rounded-sm px-2 py-1 gap-[2px] h-auto ">
                    {user.labels &&
                      user.labels.map(
                        (label: string, index: number) =>
                          index < 3 && (
                            <div
                              key={label}
                              className="text-xs text-darkest"
                            >
                              {label + " • "}
                            </div>
                          )
                      )}
                  </div>
                </Link>
              ))}
        </div>
      }
    </>
  );
};

export default SuggestionBox;
