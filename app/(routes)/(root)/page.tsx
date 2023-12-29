import { Button } from "@/components/ui/button";
import { serverAuth } from "@/lib/serverAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AboutAdvSec from "./sections/aboutAdvSec";
import ContentAdvSec from "./sections/contentAdvSec";
import JoinNow from "@/components/joinNow";
import ExploreAdvSec from "./sections/exploreAdvSec";

const Page = async () => {
  const { currentUser } = await serverAuth();



  return (
    <>
      <section
        style={{ backgroundImage: `url("/AdvPics/intro/profileHome.png")` }}
        className="relative bg-contain bg-no-repeat bg-right-bottom  w-full min-h-screen max-h-fit pt-2 md:pt-4 px-4 lg:pt-6 flex items-center justify-center md:justify-start"
      >
        <div className="w-10/12  lg:w-1/2">
          <div className="rounded-xl h-[80vh] my-2 px-4 md:px-6 md:py-8 py-6 bg-light shadow-sm bg-opacity-90">
            <div className="text-dark w-full h-full flex flex-col justify-between items-start">
              <p className="text-lg">Unleash your digital presence with</p>
              <br />
              <h1 className="text-darkest font-bold text-5xl md:text-6xl xl:text-9xl my-1">
                Introge<span className="animate-ping">_</span>
              </h1>
              <br />
              <p className="">
                A versatile platform where you can effortlessly showcase your
                projects, blogs, skills or any other content and your social
                media handles, while connecting and exploring other creative
                profiles.
              </p>
              {currentUser ? <Link className='bg-mid h-20 w-full text-xl flex items-center justify-center text-darkest rounded-md p-6 hover:bg-brand' href={`/${currentUser.username}`}>
                Go to your profile
              </Link> : <JoinNow className="h-20 w-full text-2xl"/>}
            </div>
          </div>
        </div>
      </section>
      <AboutAdvSec />
      <ExploreAdvSec />
      <ContentAdvSec />

    </>
  );
};

export default Page;
