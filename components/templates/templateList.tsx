"use client"

import { GrBlog } from "react-icons/gr";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import BlogTemplate from "./blog";

export const templateList = [
    {
        label: "Blogs",
        icon: GrBlog,
        template: BlogTemplate,
        color: "text-white"
    },

];
export const TemplateFinder = ({ section }: { section: { name: string, template: string } }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    const template = templateList.find(
        (templateItem) => templateItem.label === section.template
    );
    return template ? (


        <template.icon className={`w-6 h-6 ${template?.color}`} />


    ) : (
        null
    );
};

export const Template = ({ section }: { section: { name: string, template: string } }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    const template = templateList.find(
        (templateItem) => templateItem.label === section.template
    );
    return template ? template : {
        label: "Blogs",
        icon: GrBlog,
        template: BlogTemplate,
        color: "text-white"
    }
};