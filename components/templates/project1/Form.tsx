"use client"
import { SectionItem } from "@prisma/client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Unlink } from "lucide-react";
import { ExistingUrlscard } from "./existingURLs";

interface Project1FormProps {
    onSubmit: (data: any) => void;
    initialData?: SectionItem;
    disabled: boolean;

}

const formSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "Title must be atleast of 3 letters",
        })
        .max(40, {
            message: "Title must not be more than 40 letters",
        }),
    about: z
        .string()
        .min(5, {
            message: "About section should not be less than 5 letters",
        })
        .max(150, {
            message: "About section should not be more than 150 letters",
        }),
    url: z.string(),
    imageURL: z.string(),
    labels: z.string(),
    progressDetail: z.string(),

});
type Project1FormValues = z.infer<typeof formSchema>;

const Project1Form: React.FC<Project1FormProps> = ({
    onSubmit,
    initialData,
    disabled,
}) => {
    const action = initialData ? "Save Changes" : "Add new item";
    const [linkName, setLinkName] = useState("")
    const [link, setLink] = useState("")

    const [otherURLs, setOtherURLs] = useState(initialData ? initialData?.otherURLs : "[]")
     const form = useForm<Project1FormValues>({
        resolver: zodResolver(formSchema),

        defaultValues: initialData
            ? ({ ...initialData, progressDetail:initialData.labels?.split(", ")?.[0], labels:initialData.labels?.split(", ").slice(1).join(", ")} as any)
            : {
                name: "",
                about: "",
                url: "",
                imageURL: "",
                labels: "",
                progressDetail: "",

            },
    });
    const progressEnqList = ["Completed ✔", "On Progress ⚙", "Not started 📪", "Abondand 🛑", "Continuous Development 🚀"]
    const addLink = () => {
        if (linkName.length < 3 || link.length < 3) {
            alert("Invalid Input")
        } else {
            const newLink = {
                title: linkName,
                url: link,
            };


            setOtherURLs(prevState => JSON.stringify([...JSON.parse(String(prevState)), newLink]))

            setLink(""),
                setLinkName("")

             
        }
    }
    const removeLink = (index:number) =>{
        console.log(index)
        const newURLs = [...JSON.parse(String(otherURLs)).slice(0,index),...JSON.parse(String(otherURLs)).slice(index+1)]
        setOtherURLs(JSON.stringify(newURLs))
    }
    const handleSubmit = async (data: Project1FormValues) => {
        
        let reformedlabels;
        
            reformedlabels = data.progressDetail + ", " + data.labels
        const reformedData = { ...data, labels: reformedlabels, otherURLs }

        await onSubmit(reformedData)
        form.reset()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2 w-full md:w-[450px]  border-2 rounded-md p-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_30px] shadow-black"
            >
                <Label>{action}</Label>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    className="h-8"
                                    disabled={disabled}
                                    placeholder="Project title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    type="url"
                                    className="h-8"
                                    disabled={disabled}
                                    placeholder="Primary URL"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageURL"
                    render={({ field }) => (
                        <FormItem className=" w-full">
                            <FormControl>
                                <Input
                                    type="url"
                                    className="h-8"
                                    disabled={disabled}
                                    placeholder="Image Link"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem className="  h-[90px] w-full">
                            <FormControl>
                                <Textarea
                                    className="w-full h-full"
                                    disabled={disabled}
                                    placeholder="Project Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}

                    name="progressDetail"
                    render={({ field }) => (
                        <FormItem className="w-full md:flex-1">
                            <Select
                                required={true}
                                disabled={disabled}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            defaultValue={field.value}
                                            placeholder="Select your project stage"
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent style={{}} className="max-h-[200px] overflow-y-scroll">
                                    {progressEnqList.map((column) => (
                                        <SelectItem
                                            key={column}
                                            className="w-full h-10 cursor-pointer my-1"
                                            value={column}
                                        >
                                            <p className="flex items-center gap-4">

                                                <span>{column}</span>
                                            </p>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="labels"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    className="h-8"
                                    disabled={disabled}
                                    placeholder="Labels (seperate by comma) "
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full m-1 p-1 border-[1px] flex flex-col gap-1">
                    <p className="text-xs ">Extra Links</p>

                    <Input
                        className="h-8"
                       
                        value={linkName}
                        disabled={disabled}
                        placeholder="Link Title"
                        onChange={(e) => { e.preventDefault(); setLinkName(e.target.value) }}
                    />
                    <Input
                        className="h-8"
                        
                        type="url"
                        value={link}
                        disabled={disabled}
                        placeholder="Link Url"
                        onChange={(e) => { e.preventDefault(); setLink(e.target.value) }}
                    />
                    <Button type="button" onClick={() => addLink()} className="w-full h-7 bg-gray-300" variant="outline">
                        Add Extra Link
                    </Button>

                    <div className="flex gap-2 flex-wrap w-full">
                        { JSON.parse(String(otherURLs)).length>0 ? JSON.parse(String(otherURLs)).map((link:any,index:number)=> <ExistingUrlscard  key={index} title={link.title} url={link.url} onDelete={removeLink} index={index}/>):null}
                    </div>

                </div>
                <div>

                </div>
                <Button
                    disabled={disabled}
                    className="ml-auto my-2 w-full md:w-full bg-dark h-10"
                    type="submit"
                >
                    {action}
                </Button>
            </form>
        </Form>
    );
};

export default Project1Form