"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {HexColorPicker} from "react-colorful"
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProfileImage from "@/components/profileImage";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { ExsitingLabelscard } from "./existingSocial&Labelcard";
import { LabelList } from "@/components/templates/labelsList";
import SocialForm from "./editSocialForm";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const formSchema = z.object({
    username:z.string().min(4,{
        message:"Username can nott be less than 4 letters"
    }).regex(/^[a-zA-Z0-9\-._&!+()]+$/, {
        message: "Only letters, numbers and `-` `.` `_` `&` `!` `+` `(` `)` are allowed"
    }),
    name: z.string().min(3, {
        message: "Name should have more than 3 letters",
    }),
    profilepic: z.any(),
    bio: z
        .string()
        .min(5, {
            message: "Bio should not have less than 5 letters",
        })
        .max(300, {
            message: "Bio should not be more that 300 letters",
        }),
  
    email: z.string(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
    className?: string;
    initialData: {
        id: string;
        name?: string;
        email: string;
        profilepic?: string | null;
        bio: string | undefined;
        username: string;
        socials: any;
        labels: string[];
        backgroundColor?:string;
        textColor?:string
    };
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    className,
    initialData,
}) => {
    const router = useRouter();

    const [loading, setloading] = useState(false);
    const [profilepic, setProfilepic] = useState(initialData?.profilepic);
    const [labels, setLabels] = useState([...initialData.labels] || []);
    const [socials, setSocials] = useState(initialData?.socials || "[]");
    const [backgroundColor, setBackgroundColor] = useState(initialData.backgroundColor ? initialData.backgroundColor : "#01161E");
    const [textColor, setTextColor] = useState(initialData.textColor || "#CFE3E9")
    console.log(backgroundColor)
     const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            email: "",
            username: "",
            name: "",
            bio: "",
            socials: [],
        },
    });
    const addSocial = (data: any) => {
        
        if (
            data.title.length < 2 ||
            data.url.length < 2 ||
            data.username.length < 2
        ) {
            alert("Invalid social details");
        } else {
            const newSocialDetail = { ...data };
            setSocials(
                (prevState: { title: string; url: string; username: string }[]) =>
                    JSON.stringify([...JSON.parse(String(prevState)), newSocialDetail])
            );
        }
    };
    const removeSocial = (index: number) => {
        const newSocialDetail = [
            ...JSON.parse(String(socials)).slice(0, index),
            ...JSON.parse(String(socials)).slice(index + 1),
        ];
        setSocials(JSON.stringify(newSocialDetail));
    };
    const onSubmit = async (data: ProfileFormValues) => {
        try {
            setloading(true);
            await axios.patch(`/api/${initialData.id}/editprofile`, {
                ...data,
                profilepic,
                labels,
                socials,
                backgroundColor,
                textColor
            });
            router.refresh();
            toast.success("Profile Updated");
        } catch (error: any) {
            toast.error("Something went wrong");
        } finally {
            setloading(false);
        }
    };

    return (
        <div className={cn(`w-full p-1`, className)}>
            <h1 className="text-xl font-bold">Basic Profile</h1>
            <div className="grid md:grid-cols-3">
                <div className="col-span-1 py-2 flex  justify-center">
                    <div className=" h-full">
                        <div className="flex items-center justify-center py-2">
                            <ProfileImage
                                editable={true}
                                value={profilepic ? profilepic : null}
                                disabled={loading}
                                onChange={(value) => setProfilepic(value)}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-y-2 py-2 font-semibold text-lg ">
                            <p className="py-2">{initialData.email}</p>
                           
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 ">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 w-full"
                        >
                            <div className="w-full px-2 flex flex-col gap-6 items-center ">
                            <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Your Username"
                                                    className="text-black"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Your name"
                                                    className="text-black"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="min-h-[120px] text-black"
                                                    disabled={loading}
                                                    placeholder="Tell us something about yourself"
                                                     
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="w-full py-2">
                <h3 className="font-semibold text-lg py-2">Edit Labels</h3>
                {labels.length > 0 ? (
                    <div className="max-h-[100px] py-1 overflow-y-auto flex gap-2 w-full flex-wrap">
                        {labels.map((label) => (
                            <ExsitingLabelscard
                                key={label}
                                value={label}
                                exist={true}
                                disabled={loading}
                                onClick={(value) => {
                                    setLabels([...labels.filter((label) => label !== value)]);
                                }}
                            />
                        ))}
                    </div>
                ) : null}

                <hr />
                <div className="w-full max-h-[300px] m-2 px-1 border-[1px] overflow-y-auto">
                {LabelList.map((labelGroup) => (
                    <div key={labelGroup.title}>
                        <Accordion type="single" collapsible className="w-full overflow-y-auto max-h-[200px]">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3>{labelGroup.title} Labels</h3>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap max-h-[200px]  gap-1 py-1">
                                        {[...labelGroup.list]
                                            .filter((label) => ![...labels].includes(label))
                                            .map((label) => (
                                                <ExsitingLabelscard
                                                    key={label}
                                                    value={label}
                                                    exist={false}
                                                    disabled={loading}
                                                    onClick={(value) => {
                                                        setLabels([...labels, value]);
                                                    }}
                                                />
                                            ))}
                                    </div>

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))}
                </div>
                <p className="p-1 bg-dark text-xs text-light rounded-sm my-1">Not found your faviorable label? Contact Developer to update list</p>
            </div>
            <div style={{backgroundColor:backgroundColor, color:textColor}} className={`rounded-lg py-2 w-full gap-4  items-center justify-around h-fit flex flex-col md:flex-row  `}>
                <h3 className="py-2">Apperance</h3>
                <div className="md:w-1/3 flex flex-col items-center">
                    <p >Set Primary background color</p>
                    
                <HexColorPicker className="py-2 w-full" color={backgroundColor} onChange={setBackgroundColor}/>
                <Input className="text-black" value={backgroundColor} onChange={(e)=>{e.preventDefault(); setBackgroundColor(e.target.value)}}/>
                </div>
                <div className="md:w-1/3 flex flex-col items-center">
                    <p>Set Primary text color</p>
                    
                <HexColorPicker className="py-2 w-full" color={textColor} onChange={setTextColor}/>
                <Input className="text-black" value={textColor} onChange={(e)=>{e.preventDefault(); setTextColor(e.target.value)}} />
                </div>
            </div>
            <SocialForm
                initialData={[...JSON.parse(String(socials))]}
                removeSocial={removeSocial}
                addSocial={addSocial}
            />
            <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full mt-5 ml-auto"
            >
                Save Profile Changes
            </Button>
        </div>
    );
};

export default ProfileForm;
