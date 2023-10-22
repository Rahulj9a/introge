"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Social, User } from "@prisma/client";
import { Trash } from "lucide-react";
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
import { useParams, useRouter } from "next/navigation";
import ProfileImage from "./profileImage";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";

const formSchema = z.object({
    userId: z.string(),
    platform: z.string().min(1, {
        message: "Platform name should not be less that 1 letter",
    }),
    platformUsername: z.string().min(2, {
        message: "Username should have more than 2 letters",
    }),
    url: z
        .string()
        .regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, { message: "Invalid URL" }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
    className?: string;
    initialData?: Social[];
    userid: string;
    username:string
}

const SocialForm: React.FC<ProfileFormProps> = ({
    className,
    initialData,
    userid,
    username
}) => {
    const router = useRouter();

    const [loading, setloading] = useState(false);


    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId:userid,
            platform: "",
            platformUsername: "",
            url: "",
        },
    });

    const onSubmit = async (data: ProfileFormValues) => {
        console.log(data)
        try {
            setloading(true);
            await axios.post(`/api/${username}/editsocials`,data);
            router.refresh();
            toast.success("Social Updated");
        } catch (error: any) {
            toast.error("Something went wrong");
        } finally {
            setloading(false);
        }
    };
    const onDelete = async (id: string) => {
        try {
            setloading(true);
            await axios.delete(`/api/${username}/editsocials/${id}`);
            router.refresh();
            toast.success("Social deleted")
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setloading(false)
        }
    }

    return (
        <div className={cn("w-full   p-1", className)}>

            <h1 className="font-bold text-xl pb-8">Socials</h1>

            {initialData && initialData?.length > 0 ? initialData.map((social) => (
                <div className="flex" key={social.url}>
                    <p>
                        {social.platform}
                    </p>
                    <p>
                        {social.username}
                    </p>
                    <p>
                        {social.url}
                    </p>
                    <Button type='button' size="icon" variant="destructive" /* onClick={() => onDelete(url)} */>
                        <Trash className="h-4 w-4" />
                    </Button>

                </div>
            ))
                : null
            }

            <Form {...form} >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="w-full p-2 md:flex-row flex-col flex gap-4 md:gap-6 items-center md:border-none border-[1px]">
                        <FormField
                            control={form.control}
                            name="platform"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Platform</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Platform Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="platformUsername"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Platform Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="@username"
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
                                    <FormLabel>Profile URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="https://twitter.com/rahulj9a"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Social Changes
                    </Button>
                </form>
            </Form>
        </div>

    );
};

export default SocialForm;
