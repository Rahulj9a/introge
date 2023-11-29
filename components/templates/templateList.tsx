"use client"

import { GrBlog, GrProjects, GrYoutube } from "react-icons/gr";
import {GiSkills} from "react-icons/gi"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import BlogTemplate from "./blog/Template";
import BlogForm from "./blog/Form";
import Project1Template from "./project1/Template";
import Project1Form from "./project1/Form";
import YoutubeTemplate from "./youtubeVideos/Template";
import YoutubeForm from "./youtubeVideos/Form";
import Skill1Template from "./skill1/Template";
import Skill1Form from "./skill1/Form";

export const templateList = [
    {
        label: "Blogs",
        icon: GrBlog,
        template: BlogTemplate,
        form:BlogForm,
        color: "text-white"
    },
    {
        label: "Project1",
        icon: GrProjects,
        template: Project1Template,
        form:Project1Form,
        color: "text-white"
    },
    {
        label: "Youtube",
        icon: GrYoutube,
        template: YoutubeTemplate,
        form:YoutubeForm,
        color: "text-red-700"
    },
    {
        label: "Skill 1",
        icon: GiSkills,
        template: Skill1Template,
        form:Skill1Form,
        color: "text-violet-700"
    }


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

 