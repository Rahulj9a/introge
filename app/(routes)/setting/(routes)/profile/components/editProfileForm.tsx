"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Social } from "@prisma/client";

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

import axios from "axios";
import { useRouter } from "next/navigation";
import ProfileImage from "@/components/profileImage";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";


import { ExsitingLabelscard } from "./existingSocial&Labelcard";
import { LabelList } from "@/components/templates/labelsList";

const formSchema = z.object({
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
    username: z.string(),
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
        socials: Social[];
        labels: string[];
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

    const onSubmit = async (data: ProfileFormValues) => {

        try {
            setloading(true);
            await axios.patch(`/api/${initialData.username}/editprofile`, {
                ...data,
                profilepic,
                labels
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
        <div className={cn("w-full p-1", className)}>
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
                        <div className="flex flex-col items-center justify-center gap-y-2 py-2 font-semibold text-lg text-gray-600">
                            <p className="py-2">{initialData.email}</p>
                            <p className="py-2">@{initialData.username}</p>
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
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Your name"
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
                                                    className="min-h-[120px]"
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
                <h3 className="font-semibold text-sm py-2">Labels</h3>
                {labels.length > 0 ? (<div className="max-h-[100px] py-1 flex gap-2 flex-wrap w-full flex-wrap">
                    {labels.map((label) => (
                        <ExsitingLabelscard
                            value={label}
                            exist={true}
                            disabled={loading}
                            onClick={(value) => {

                                setLabels([
                                    ...labels.filter((label) => label !== value),
                                ])

                            }

                            }
                        />
                    ))}
                </div>) : null}

                <hr />
                {LabelList.map((labelGroup) =>
                    <div>
                        <h3 className="text-xs text-semibold ">{labelGroup.title}</h3>
                        <div className="flex flex-wrap max-h-[200px] overflow-y-scroll gap-1 py-1">
                            {[...labelGroup.list].filter(label => ![...labels].includes(label)).map((label) => (
                                <ExsitingLabelscard
                                    value={label}
                                    exist={false}
                                    disabled={loading}
                                    onClick={(value) => {
                                        setLabels([
                                            ...labels, value
                                        ]);

                                    }
                                    }
                                />
                            ))
                            }
                        </div>
                    </div>

                )}


            </div>
            <Button disabled={loading} className="w-full mt-5 ml-auto">
                Save Profile Changes
            </Button>

        </div>
    );
};

export default ProfileForm;
