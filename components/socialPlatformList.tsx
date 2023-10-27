"use client"
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { AiOutlineReddit, AiOutlineWhatsApp } from "react-icons/ai"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BsSnapchat, BsMedium } from 'react-icons/bs'
import {GrSnapchat} from "react-icons/gr"

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
        icon: Twitter,
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
];

const PlatformFinder = ({ social }: { social: { platform: string, username:string } }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    const platform = socialPlatforms.find(
        (platform) => platform.label === social.platform
    );
    return platform ? (
        
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <platform.icon className={`w-6 h-6 ${platform?.color}`} />
                    </TooltipTrigger>
                    <TooltipContent >
                        <span className="text-xs" >{social.platform} : @{social.username}</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider >
         
    ) : (
    null
    );
};



export default PlatformFinder