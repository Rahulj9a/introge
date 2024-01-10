import { Github, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { BsHeartFill } from "react-icons/bs";
import { serverAuth } from "@/lib/serverAuth";
import { Button } from "../ui/button";
import JoinNow from "../joinNow";

const Footer = async () => {
  const { currentUser } = await serverAuth();

  return (
    <footer className="w-full h-fit bg-darkest relative m-0 z-30 px-4 py-2 lg:px-8   text-light">
      <div className="w-full flex items-center lg:flex-row flex-col py-2 justify-between">
        <div className="w-fit h-fit p-2">
          <Link href="/" className="flex items-center gap-4 justify-center cursor-pointer">
            <Image
              width={50}
              height={50}
              src="/introge.png"
              alt="introge"
              className=""
            />
            <span className="font-bold text-xl">Introge</span>
          </Link>
          {currentUser?null: <JoinNow className="w-full my-2"/>}
        </div>
        <div className="flex gap-8">
          <Link
            target="_blank"
            href="https://twitter.com/introge_hq"
            className="text-xl border-transparent hover:border-white border-2 p-2 rounded-full"
          >
            <FaXTwitter />
          </Link>
          <Link
            target="_blank"
            href="https://github.com/Rahulj9a/intorge"
            className="text-xl border-transparent hover:border-white border-2 p-2 rounded-full"
          >
            <Github />
          </Link>
          <Link
            target="_blank"
            href="https://instagram.com/introge_hq"
            className="text-xl border-transparent hover:border-white border-2 p-2 rounded-full"
          >
            <Instagram />
          </Link>
        </div>
      </div>
      {/*    <div className="flex flex-wrap justify-around gap-4  w-full h-fit py-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-white">Explore</h1>

          <Link className="text-gray-500" href="/explore/people">Peoples</Link>
           <Link href="/explore/templates">Templates</Link>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-white">Open-Source</h1>

          <Link target="_blank" href="https://github.com/Rahulj9a/profiley">Repository</Link>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-white">Contact Developer</h1>

          <p>rahulj9a@gmail.com</p>
          <Link target="_blank" href="https://twitter.com/Rahulj9a">Twitter</Link>
          <Link target="_blank" href="https://www.linkedin.com/in/rahulj9a/">Linkedin</Link>

        </div>
      </div> */}
      <p className="w-full flex text-sm items-center justify-center py-2">
        Contact Developer : rahulj9a@gmail.com
      </p>

      <p className="flex gap-2 py-2 items-center text-base w-full justify-center">
        Made with <BsHeartFill className="w-4 h-4 text-red-600" /> by
        <Link href={`/rahulj9a`} className="hover:text-light" target="_blank">
          Rahul Solanki
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
