"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { User } from "@prisma/client";
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
    name: z.string().min(3, {
        message: "Name should have more than 3 letters",
    }),
    profilepic: z.string(),
    bio: z.string().min(5, {
        message: "Bio should not have less than 5 letters",
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
        profilepic?: string | undefined;
        bio: string | undefined;
        username: string;
    };
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    className,
    initialData,
}) => {
    const params = useParams();

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [profilepic, setProfilepic] = useState(
        initialData?.profilepic || undefined
    );

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            email: "",
            username: "",
            name: "",

            bio: "",
        },
    });

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            setloading(true);
            await axios.patch(`/api/${initialData.username}/editprofile`, {
                ...data,
                profilepic,
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
        <div className={cn("w-full", className)}>
            <div className="grid md:grid-cols-3">
                <div className="col-span-1 py-2">
                    <div className="flex items-center justify-center py-2">
                        <ProfileImage
                            value={profilepic ? profilepic : undefined}
                            disabled={loading}
                            onChange={(url) => setProfilepic(url)}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-y-2 py-2 font-semibold text-lg text-gray-600">
                        <p className="py-2">{initialData.email}</p>
                        <p className="py-2">@{initialData.username}</p>
                    </div>
                </div>

                <div className="md:col-span-2">
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
                                                minLength={100}
                                                    disabled={loading}
                                                    placeholder="Tell us something about yourself"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={loading} className="ml-auto" type="submit">
                                    Save Changes
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
