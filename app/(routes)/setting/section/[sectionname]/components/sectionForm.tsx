"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section, SectionItem, User } from '@prisma/client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Section name must be atleast of 3 letters"
    }).max(15, {
        message: "Section name must not be more than "
    }).regex(/^[a-zA-Z]+$/, {
        message: "Section name should only contain letters without any special characters and spaces"
    }),
    about: z.string().min(5, {
        message: "About section should not be less than 5 letters"
    }).max(300, {
        message: "About section should not be more than 300 letters"
    }),
    isActive: z.boolean().default(true).optional(),
});

type SectionFormValues = z.infer<typeof formSchema>;

interface SectionFormProps {
    initialData?: {
        id:string
        name: string,
        about: string,
        isActive: boolean,
        sectionItems: SectionItem
    },
    currentUser: User
}


const SectionForm: React.FC<SectionFormProps> = ({ initialData, currentUser }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const toastMessage = initialData ? "Section Updated" : "Section Created"
    const action = initialData ? "Save Changes" : "Create"
    const form = useForm<SectionFormValues>({
        resolver: zodResolver(formSchema),

        defaultValues: initialData ? { ...initialData } : {
            name: '',
            about: '',
            isActive: true,


        },
    });

    const onSubmit = async (data: SectionFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${currentUser.username}/section/${initialData.id}`, data)
            } else {
                await axios.post(`/api/${currentUser.username}/section`, data)
            }
            router.refresh()
            router.push(`/setting/section`)
            toast.success(toastMessage)
        } catch (error: any) {
            console.log(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    const onDelete = () => {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full flex flex-col">
                <div className="flex items-center justify-center">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">

                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Section Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField

                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="w-32 flex items-center justify-center">
                                <FormLabel>Active</FormLabel>

                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={loading}
                                        aria-readonly
                                    />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                </div>
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>

                            <FormControl>
                                <Textarea
                                    disabled={loading}
                                    placeholder="Tell the world more about this section"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className="ml-auto w-1/3 bg-dark" type="submit">
                    {action}
                </Button>
            </form>
        </Form>
    )
}

export default SectionForm