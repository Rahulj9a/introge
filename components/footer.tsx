 
import { Github, Heart, HeartIcon, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
 import { BsHeartFill } from "react-icons/bs";

const Footer = async () => {
   
  return (
    <footer className="w-full h-fit bg-darkest absolute m-0 z-40 px-4 py-2 lg:px-8 border-t-2  text-light">
      <div className="w-full flex items-center lg:flex-row flex-col py-4 justify-between">
        <Link
          className="w-fit h-fit p-2 flex items-center gap-4 justify-center cursor-pointer"
          href="/"
        
        >
          <Image
            width={50}
            height={50}
            src="/profiley.png"
            alt="Profiley"
            className=""
          />
          <span className="font-bold text-2xl">Profiley</span>
        </Link>
        <div className="flex gap-8">
          <Link
          target="_blank"
            href="https://twitter.com/twitter_hq"
            className="text-xl border-transparent hover:border-white border-2 p-2 rounded-full"
          >
            <FaXTwitter />
          </Link>
          <Link
          target="_blank"
            href="https://github.com/Rahulj9a/profiley"
            className="text-xl border-transparent hover:border-white border-2 p-2 rounded-full"
          >
            <Github />
          </Link>
          <Link
          target="_blank"
            href="https://instagram.com/twitter_hq"
            className="text-xl border-transparent hover:border-white border-2 p-2 rounded-full"
          >
            <Instagram />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-4  w-full h-fit py-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Explore</h1>

          <Link href="/explore/people">Peoples</Link>
          <Link href="/explore/sections">Sections</Link>
          <Link href="/explore/templates">Templates</Link>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Open-Source</h1>

          <Link target="_blank" href="https://github.com/Rahulj9a/profiley">Repository</Link>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Contact Developer</h1>

          <p>rahulj9a@gmail.com</p>
          <Link target="_blank" href="https://twitter.com/Rahulj9a">Twitter</Link>
          <Link target="_blank" href="https://www.linkedin.com/in/rahulj9a/">Linkedin</Link>

        </div>
      </div>

      <p className="flex gap-2 py-4 items-center text-xl w-full justify-center">
        Made with <BsHeartFill className="w-6 h-6 text-red-600"/> by 
        
          <Link href={`/rahulj9a`} target="_blank">
              Rahul Solanki
          </Link>
         
      </p>
    </footer>
  );
};

export default Footer;
