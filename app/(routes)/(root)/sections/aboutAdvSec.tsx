"use client";
import Image from "next/image";
import React from "react";

const AboutAdvSec = () => {
    const aboutInfo = [
        {
            title: "Showcase the world and tell them more about yourself",
            image: "/AdvPics/about/show.jpg",
            background: "#ddc9ae",
            text: "#09083c",
        },
        {
            title: "Let everyone find and connect with you easily",
            image: "/AdvPics/SocialMedia/find.jpg",
            background: "#ddc9ae",
            text: "#09083c",
        },
        {
            title: "Choose your choice of profile color",
            image: "/AdvPics/about/background.jpg",
            background: "#ddc9ae",
            text: "#09083c",
        },
        {
            title: "Not just background but choosing text's color is also possible",
            image: "/AdvPics/about/text.jpg",
            background: "#ddc9ae",
            text: "#09083c",
        },
        {
            title: "Set your bio and labels for better",
            image: "/AdvPics/about/edit.jpg",
            background: "#ddc9ae",
            text: "#09083c",
        },


        {
            title: "List you social media handles easily",

            image: "/AdvPics/SocialMedia/create.jpg",
            background: "#ddc9ae",
            text: "#09083c",
        },

    ];
    return (
        <>
            <section className="bg-[#2f5a2e] text-center w-full flex flex-col items-center text-[#d5eaad] lg:py-6 py-4 px-3">
                <h1 className="text-4xl w-3/4 font-semibold lg:w-1/3">
                    Present a more precise profile while sharing your social media handles
                </h1>
                <p className="w-3/4 lg:w-2/3 text-lg my-2 text-[#abc47b]">
                    Impress the world with your bio and make your profile more discoverable
                    and impressive with labels. And let anyone connect with you on your choice of social media easily. Not just that on your creative side you can also change your profile's background colors and text colors.
                </p>
                <div className="  flex w-full snap-x scroll-auto h-fit pb-4 pt-8 overflow-y-hidden overflow-x-auto gap-8">
                    {aboutInfo.map((info) => (
                        <div
                            style={{ backgroundColor: info.background, color: info.text }}
                            className={`flex-none flex  flex-col items-center justify-between p-2 w-80 h-96 rounded-lg snap-end`}
                        >
                            <p className="flex-1 flex items-center text-2xl font-semibold">
                                {info.title}
                            </p>
                            <Image
                                src={info.image}
                                alt={info.title}
                                width={800}
                                height={800}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-[#2f5a2e] text-center w-full flex flex-col items-center text-[#d5eaad] lg:py-6 py-4 px-3">
            <div className="w-full z-10 flex-1">
                    <div className="rounded-xl h-fit my-2 px-4 md:px-6 md:py-8 py-6  bg-white bg-opacity-20">
                        <div className="text-[#d5eaad] w-full h-full flex flex-col justify-center gap-4 items-start">
                            <h1 className="lg:text-5xl text-2xl text-semi-bold">With customizable colors for almost everything</h1>
                            <p className="lg:text-xl text-lg">Whether its profile color or content's template's text color  </p>
                        </div>
                    </div>
                   
                </div>

            </section>
        </>
    );
};

export default AboutAdvSec;
