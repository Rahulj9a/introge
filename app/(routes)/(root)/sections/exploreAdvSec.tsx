import Link from "next/link";
import React from "react";
import { BsPeople } from "react-icons/bs";

const ExploreAdvSec = () => {
  return (
    <>
      <section className="bg-[#ffc4c4] text-center w-full flex flex-col items-center text-[#0f2c30] lg:py-6 py-4 px-3">
        <h1 className="text-4xl w-3/4 font-semibold lg:w-1/3">
          Discover people with same interest and Explore their profile
        </h1>
        <p className="w-3/4 lg:w-2/3 text-lg my-2 text-[#425558]">
          Find people with same interest in recommand section or find them with
          filter feature inside explore section.
        </p>
        <div className="flex gap-4 flex-col md:flex-row w-full h-fit text-[#ffc4c4]">
          <Link href="/explore/people" className="bg-[#0f2c30] hover:bg-[#425558] cursor-pointer gap-2 p-2 rounded-lg py-4 h-28 text-xl flex items-center justify-center flex-1">
            Discover people <BsPeople className="w-6" />
          </Link>
          </div>

      </section>
    </>
  );
};

export default ExploreAdvSec;
