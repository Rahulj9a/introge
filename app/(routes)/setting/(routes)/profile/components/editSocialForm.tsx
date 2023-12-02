"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Social} from "@prisma/client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
 
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

import axios from "axios";
import {   useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { platform } from "os";
import { ExistingSocialscard } from "./existingSocial&Labelcard";
 
import PlatformFinder, { socialPlatforms } from "@/components/socialPlatformList";


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
    username: string;
}

const SocialForm: React.FC<ProfileFormProps> = ({
    className,
    initialData,
    userid,
    username,
}) => {
    const router = useRouter();

    const [loading, setloading] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: userid,
            platform: "",
            platformUsername: "",
            url: "",
        },
    });
     

    const onSubmit = async (data: ProfileFormValues) => {
        console.log(data);
        try {
            setloading(true);
            await axios.post(`/api/${username}/editsocials`, data);
            form.reset();
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
            toast.success(`Social unlinked`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setloading(false);
        }
    };

    return (
        <div className={cn("w-full p-1", className)}>
            <h1 className="font-bold text-xl py-2">Socials</h1>

            {initialData && initialData?.length > 0 ? (
                <div className=" py-4 grid grid-cols-1 md:grid-cols-2 gap-2 lg:gird-cols-3 xl:grid-cols-4">

                    {initialData.map((social) => (
                        <div className="rounded-full border-[1px] grid " key={social.url}>
                            <ExistingSocialscard onDelete={(id)=>onDelete(id)} social={social} platformIcon={PlatformFinder({social} as any)}/>
                        </div>
                    ))}
                </div>
            ) : null}

            <Form  {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full py-2"
                >
                    <div className="w-full p-2 md:flex-row flex-col flex gap-4 md:gap-6 items-center md:border-none border-[1px]">
                        <FormField
                            control={form.control}
                            name="platform"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Platform"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent style={{}}  className="max-h-[250px] overflow-y-scroll">
                                            {socialPlatforms.map((platform) => (
                                                <SelectItem
                                                    key={platform.label}
                                                    className="w-full h-10 cursor-pointer my-1"
                                                    value={platform.label}
                                                >
                                                    <p className="flex items-center gap-4">
                                                        <platform.icon
                                                            className={cn("h-5 w-5 ", platform.color)}
                                                        />
                                                        <span>{platform.label}</span>
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
                            name="platformUsername"
                            render={({ field }) => (
                                <FormItem className="w-full">
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
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="https://twitter.com/username"
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
