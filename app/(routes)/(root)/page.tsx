import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import JoinNow from "@/components/joinNow";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const { currentUser } = await serverAuth();

  return (
    <>
      <section className="box-decoration-clone flex flex-col items-center bg-gradient-to-b from-darkest gap-4 to-light py-12 justify-center min-h-screen max-h-fit h-full">
        <div className="w-2/3 h-fit flex flex-col my-6 h-[50vh] items-center justify-center gap-6 text-center">
          <p className="text-light">Welcome to</p>
          <h1 className="text-6xl lg:text-8xl text-lightest">Introge</h1>
          <p className="text-light">
            a unique application designed to help you to build and showcase your
            online presence seamlessly. Join Introge - list your handles and content/work - get a unique link of your profile - share easily with world
          </p>
        </div>
        <div className="flex w-full items-center justify-center gap-1 my-6 lg:gap-2">
          <Image
            className="h-auto w-[100px] lg:w-[140px] hidden lg:block object-contain"
            width={300}
            height={300}
            alt="demo1"
            src="/AdvPics/intro/sample4.jpg"
          />
          <Image
            className="h-auto w-[110px]  lg:w-[170px] ] hidden lg:block object-contain"
            width={400}
            height={400}
            alt="demo1"
            src="/AdvPics/intro/sample2.jpg"
          />
          <Image
            className="h-auto w-[120px] lg:w-[200px] object-contain"
            width={500}
            height={500}
            alt="demo1"
            src="/AdvPics/intro/sample1.jpg"
          />
          <Image
            className="h-auto w-[110px]  lg:w-[170px] object-contain"
            width={400}
            height={400}
            alt="demo1"
            src="/AdvPics/intro/sample3.jpg"
          />
          <Image
            className="h-auto w-[100px] lg:w-[140px] object-contain"
            width={300}
            height={300}
            alt="demo1"
            src="/AdvPics/intro/sample5.jpg"
          />
        </div>
      </section>
      <div className="flex items-center justify-center w-full">
      {currentUser ? <Link className="bg-mid h-20 w-1/3 text-xl flex items-center justify-center text-darkest rounded-md p-6 hover:bg-brand" href={`/${currentUser.username}`}>
        Go to your profile
      </Link> : <JoinNow className= "h-20 w-1/3 text-2xl"/>}
      </div>
      <section className=" w-full h-auto flex flex-col  items-center justify-center py-12 bg-light">
        <div className="flex flex-col p-1 pb-4 w-3/4 lg:w-[600px] items-center justify-center border-r-[1px] border-r-black gap-6 text-center">
          <h3 className=" text-3xl lg:text-4xl text-darkest">
            Unified Social Media Presence
          </h3>
          <p className="text-dark lg:text-lg">
            Say goodbye to scattered links. Consolidate all your social media
            handles in one place, making it easy for others to connect with you
            across various platforms.
          </p>
        </div>
        <Image
          alt="unified social media presence"
          width={800}
          height={800}
          className="w-3/4 lg:w-[600px] h-auto"
          src="/AdvPics/intro/Frame1.png"
        />
        <div className="flex flex-col p-1 pt-4 w-3/4 lg:w-[600px] border-l-[1px] border-l-black items-center justify-center gap-6 text-center">
          <h3 className=" text-3xl lg:text-4xl text-darkest">
            Easy Content Integration
          </h3>
          <p className="text-dark lg:text-lg">
            Effortlessly add content to their custom sections by inputting just
            a few fields associated with their skills, projects, blogs, or any
            other online presence and let introge display it on your profile
          </p>
        </div>
      </section>
      <div className="flex items-center justify-center w-full">
      {currentUser ? <Link className="bg-mid h-20 w-1/3 text-xl flex items-center justify-center text-darkest rounded-md p-6 hover:bg-brand" href={`/${currentUser.username}`}>
        Go to your profile
      </Link> : <JoinNow className="h-20 w-1/3 text-2xl" />}
      </div>
      <section className=" w-full h-auto flex flex-col  items-center justify-center py-12 bg-light">
        <div className="flex flex-col p-1 pb-4 w-2/3 items-center justify-center gap-6 text-center">
          <p className="text-dark lg:text-lg">
            Want to share just one type of content at once?
          </p>
          <h3 className=" text-3xl lg:text-4xl text-darkest">
            Create custom sections to show variety
          </h3>
          <p className="text-dark lg:text-lg">
            Create custom and personalizes sections to keep different contents
            in different sections highlighting your skills, projects, blogs, and
            more. With that get a unique link for each section
          </p>
        </div>
        <div className="relative w-full h-fit flex items-center justify-center ">
          <div className="box-decoration-clone bg-gradient-to-b from-light to-transparent absolute m-0  top-0 w-full h-1/4">

          </div>
          <Image
            alt="unified social media presence"
            width={800}
            height={800}
            className="w-3/4 lg:w-1/2 h-auto"
            src="/AdvPics/intro/Frame2.png"
          />
          <div className="box-decoration-clone bg-gradient-to-t from-light to-transparent absolute m-0 bottom-0 w-full h-1/4 ">

          </div>
        </div>
        <div className="flex flex-col p-1 pb-4 w-2/3 items-center justify-center gap-6 text-center">
          <p className="text-dark lg:text-lg">
            Not happy with color scheme?
          </p>
          <h3 className=" text-3xl lg:text-4xl text-darkest">
            Choose your choice of color theme
          </h3>
          <p className="text-dark lg:text-lg">
            You can choose your choice of color to set your own theme, from primary background to your content template text color. Make your profile page attractive and more personalized showing off your personality
          </p>
        </div>

      </section>
      <div className="flex items-center justify-center w-full">
      {currentUser ? <Link className="bg-mid h-20 w-1/3 text-xl flex items-center justify-center text-darkest rounded-md p-6 hover:bg-brand" href={`/${currentUser.username}`}>
        Go to your profile
      </Link> : <JoinNow className="h-20 w-1/3 text-2xl" />}
      </div>
      <section className="box-decoration-clone bg-gradient-to-t flex items-center flex-col justify-center from-darkest to-light w-full">
        <div className="flex flex-col w-2/3 p-1 h-auto pb-4  items-center justify-center gap-6 text-center">
          <p className="text-dark lg:text-lg">
            Need some inspiration?
          </p>
          <h3 className=" text-3xl lg:text-4xl text-darkest">
            Explore peoples with usernames or discover recommanded list of peoples
          </h3>
          <p className="text-light lg:text-lg">
            You can also explore profile of others easily with inbuilt Explore feature. Disover peoples with same interest in recommanded list or search with their usernames. Explore their profile and content/work to get inspired.
          </p>
        </div>

      </section>
    </>
  );
};

export default Page;
