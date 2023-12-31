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

interface YoutubeFormProps {
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

    url: z.string(),




});
type YoutubeFormValues = z.infer<typeof formSchema>;

const YoutubeForm: React.FC<YoutubeFormProps> = ({
    onSubmit,
    initialData,
    disabled,
}) => {
    const action = initialData ? "Save Changes" : "Add Youtube video";
    const form = useForm<YoutubeFormValues>({
        resolver: zodResolver(formSchema),

        defaultValues: initialData
            ? ({ ...initialData } as any)
            : {
                name: "",

                url: "",

            },
    });
    const handleSubmit = async (data: YoutubeFormValues) => {
        await onSubmit(data)
        form.reset
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2 w-full h-fit border-2 rounded-md p-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_30px] shadow-black"
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
                                    placeholder="Video title"
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
                                    className="h-8"
                                    disabled={disabled}
                                    placeholder="Video Link"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />





                <Button
                    disabled={disabled}
                    className="ml-auto my-2 w-full md:w-full bg-dark h-8"
                    type="submit"
                >
                    {action}
                </Button>
            </form>
        </Form>
    );
};

export default YoutubeForm