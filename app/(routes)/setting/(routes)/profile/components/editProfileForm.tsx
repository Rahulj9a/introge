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
    initialData: {
        name?: string;
        email: string;
        profilepic?: string | undefined;
        bio?: string;
        username: string
    };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
    const params = useParams();

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setloading] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            email: '',
            username: "",
            name: "",
            profilepic: "",
            bio: "",
        },
    });

    const onSubmit = async (data: ProfileFormValues) => { };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-6 items-center ">
                        <FormField
                        
                            control={form.control}
                            name="profilepic"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-center">
                                    <FormControl>
                                        <ProfileImage
                                        
                                            value={field.value ? field.value : undefined}
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                        />
                                    </FormControl>
                                     
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                placeholder="Your Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                placeholder="Username"
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
                                    <FormItem>
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
                        </div>
                    </div>
                    <div className="w-full">
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
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
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ProfileForm;
