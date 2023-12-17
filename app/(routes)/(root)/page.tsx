import { Button } from "@/components/ui/button";
import { serverAuth } from "@/lib/serverAuth";
import { ArrowBigRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
 
const Page = async () => {
  const currentUser = await serverAuth();

  return (
    <>
      <section style={{backgroundImage:`url("/profileHome.png")`}} className="relative bg-contain bg-no-repeat bg-right-bottom  w-full min-h-screen max-h-fit pt-2 md:pt-4 px-4 lg:pt-6 flex items-center justify-center md:justify-start">
        <div className="w-10/12  lg:w-1/2">
          <div className="rounded-xl h-[80vh] my-2 px-4 md:px-6 md:py-8 py-6 bg-light bg-opacity-90">
            <div className="text-dark w-full h-full flex flex-col justify-center items-start">
              <p className="text-lg">Unleash your digital presence with</p>
              <br />
              <p className="text-darkest font-bold text-5xl md:text-7xl lg:text-9xl my-1">
                Profiley<span className="animate-ping">_</span>
              </p>
              <br />
              <p>
                A versatile platform where you can effortlessly showcase your
                projects, blogs, skills or any other content and your social
                media handles, while connecting and exploring other creative
                profiles.
              </p>
            </div>

          </div>
        </div>
       </section>
    </>
  );
};

export default Page;
