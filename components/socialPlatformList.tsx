"use client"
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
 import { AiOutlineReddit, AiOutlineWhatsApp } from "react-icons/ai"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BsMedium} from "react-icons/bs"
import {GrSnapchat} from "react-icons/gr"
import {FaXTwitter} from "react-icons/fa6"
import { SiBuymeacoffee } from "react-icons/si";
import { SlSocialSpotify } from "react-icons/sl";
import { FiGitlab } from "react-icons/fi";

export const socialPlatforms = [
    {
        label: "Github",
        icon: Github,
        color: "text-black"
    },
    {
        label: "Instagram",
        icon: Instagram,
        color: "text-pink-800",
    },
    {
        label: "Twitter",
        icon: FaXTwitter,
        color: "text-sky-700",
    },
    {
        label: "Youtube",
        icon: Youtube,
        color: "text-red-800",
    }, {
        label: "Linkedin",
        icon: Linkedin,
        color: "text-sky-900"
    },
    {
        label: "Facebook",
        icon: Facebook,
        color: "text-blue-800"
    },
    {
        label: "Reddit",
        icon: AiOutlineReddit,
        color: "text-orange-700"
    },
    {
        label: "Whatsapp",
        icon: AiOutlineWhatsApp,
        color: "text-green-600"
    },
    {
        label: "Snapchat",
        icon:  GrSnapchat,
        color: "text-yellow-500"
    },
    {
        label: "Medium",
        icon: BsMedium,
        color: "text-black"
    },
    {
        label: "Buy Me A Coffee",
        icon: SiBuymeacoffee,
        color: "text-black"
    },
    {
        label: "Spotify",
        icon: SlSocialSpotify,
        color: "text-black"
    },
    {
        label: "Spotify",
        icon: FiGitlab,
        color: "text-black"
    },
];

const PlatformFinder = ({ social }: { social: { title: string, username:string } }) => {    
    const platform = socialPlatforms.find(
        (platform) => platform.label === social.title
    );
     
    return platform ? (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <platform.icon className={`w-6 h-6`} />
                    </TooltipTrigger>
                    <TooltipContent >
                        <span className="text-xs" >{social.title} : @{social.username}</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider >
         
    ) : (
    null
    );
};



export default PlatformFinder