//Display you content building different section and get sperate URL for seperate section
"use client"
 import {  Github, Mail, SearchIcon } from "lucide-react";
import JoinNow from "./joinNow";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const ContentAdvSec = () => {
    const sendEmail = () => {
        const recipient = 'rahulj9a@gmail.com';
        const subject = 'Idea/ Suggestion for new Template';
        const body = '';

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the user's email client
        window.location.href = mailtoLink;
    };
    const contentInfo = [
        {
            title: "Showcase your content on your profile",
            image: "/AdvPics/sections/showcase.jpg",
            background: "#4B3200",
            text: "#FFA500"
        }, {
            title: "Keep different type of content on different category",
            image: "/AdvPics/sections/create.jpg",
            background: "#4B3200",
            text: "#FFA500"
        }, {
            title: "Seperate page for each section",
            image: "/AdvPics/sections/seperate.jpg",
            background: "#4B3200",
            text: "#FFA500"
        }, {
            title: "Can activate or deactivate individual category anytime",
            image: "/AdvPics/sections/edit.jpg",
            background: "#4B3200",
            text: "#FFA500"
        },
        {
            title: "Edit background and text color",
            image: "/AdvPics/sections/color.jpg",
            background: "#4B3200",
            text: "#FFA500"
        },]

    return (
        <>
            <section
                className="relative bg-[#EDEDA8] bg-contain bg-no-repeat bg-right-bottom  w-full  max-h-fit  p-4 lg:p-6 flex flex-col items-center justify-center md:justify-start"
            >
                <div className=" z-10 flex-1">
                    <div className="rounded-xl h-fit my-2 px-4 md:px-6 md:py-8 py-6  bg-white bg-opacity-40">
                        <div className="text-[#FF6200] w-full h-full flex flex-col justify-center gap-4 items-start">
                            <h1 className="lg:text-5xl text-2xl text-semi-bold">Showcase your content/ work/ skill etc. easily on one place with dedicated sections </h1>
                            <p className="lg:text-xl text-lg">Whether it's blogs, projects, youtube video ... bascially anything, You can list them in seperate sections with each section having its seperate URL, giving you advantage to easily share just one type of content</p>
                        </div>
                    </div>
                    <JoinNow />
                </div>
                
            </section>
            <section className="bg-[#EDEDA8] text-center w-full flex flex-col items-center text-[#FF6200] lg:py-6 py-4 px-3">
                <h1 className="text-4xl lg:text-5xl w-3/4 font-semibold lg:w-2/5">
                    List your any type of content and share with world
                </h1>
                <p className="w-3/4 lg:w-2/3 text-lg my-2 text-[#FFA500]">
                    List and showcase your skill, work, content, whether it's blog, youtube video, project, skill ... basically anything, everything on one place with dedicated section and URL for each type.
                </p>
                <div className="  flex w-full snap-x scroll-auto h-fit  pb-4 pt-8  overflow-y-hidden overflow-x-auto gap-8">
                    {contentInfo.map(info => (
                        <div style={{ backgroundColor: info.background, color: info.text }} className={`flex-none flex  flex-col items-center justify-between p-2 w-80 h-96 rounded-lg snap-end`}>
                            <p className='flex-1 flex items-center text-2xl font-semibold'>{info.title}</p>
                            <Image src={info.image} alt={info.title} width={800} height={800} className='w-full h-auto rounded-md' />
                        </div>

                    ))}

                </div>
            </section>
            <section
                className="relative bg-[#EDEDA8] bg-contain bg-no-repeat bg-right-bottom  w-full  max-h-fit  p-4 lg:p-6 flex flex-col items-center justify-center md:justify-start"
            >
                <div className="w-full z-10 flex-1">
                    <div className="rounded-xl h-fit my-2 px-4 md:px-6 md:py-8 py-6 bg-black bg-opacity-20">
                        <div className="text-[#FF6200] w-full h-full flex flex-col justify-center gap-4 items-start">
                            <h1 className="lg:text-4xl text-3xl text-semi-bold">Featured with different templates for different type of content</h1>
                            <p className="lg:text-xl text-lg">As content types are different, so the way of showcasing them. We provide pre-made templates for almost each type of content with editable background and text colors.</p>
                            <p className="lg:text-xl text-lg">Have an idea for new template? Email your idea and if you are a developer than you can contribute to our project on github</p>
                            <div className="flex gap-4 flex-col md:flex-row w-full h-fit text-black">
                                <Link href="/explore/templates" className="bg-[#E9ECF4] hover:bg-white cursor-pointer gap-2 p-2 rounded-lg py-4 text-xl flex items-center justify-center flex-1">
                                    Explore templates <SearchIcon className="w-6" />
                                </Link>
                                <button onClick={sendEmail} className="bg-[#E9ECF4] hover:bg-white cursor-pointer gap-2 rounded-lg  p-2 py-4 text-xl flex items-center justify-center flex-1">
                                    Email your idea <Mail className=" w-6" />
                                </button>
                                <Link href="https://github.com/Rahulj9a/profiley" target="_blank" className="bg-[#E9ECF4] hover:bg-white cursor-pointer gap-2 py-4 p-2 rounded-lg h-28 text-xl flex items-center justify-center flex-1">
                                    Open-source <Github className="w-6" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>

    )


}

export default ContentAdvSec