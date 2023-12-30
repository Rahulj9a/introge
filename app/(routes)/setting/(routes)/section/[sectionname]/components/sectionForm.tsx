"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section, SectionItem, User } from "@prisma/client"
import React, { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { templateList } from "@/components/templates/templateList";
import { cn } from "@/lib/utils";
import { HexColorPicker } from "react-colorful";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Section name must be atleast of 3 letters"
    }).max(15, {
        message: "Section name must not be more than "
    }).regex(/^[a-zA-Z0-9\-._&!+()]+$/, {
        message: "Only letters, numbers and `-` `.` `_` `&` `!` `+` `(` `)` are allowed"
    }),
    about: z.string().min(5, {
        message: "About section should not be less than 5 letters"
    }).max(300, {
        message: "About section should not be more than 300 letters"
    }),
    template: z.string().min(1, {
        message: "Template field can not be empty"
    }),
    isActive: z.boolean().default(true).optional(),
});

type SectionFormValues = z.infer<typeof formSchema>;

interface SectionFormProps {
    initialData?: {
        id: string
        name: string,
        about: string,
        isActive: boolean,
        sectionItems: SectionItem,
        template: string,
        backgroundColor?: string,
        itemsBackgroundColor?: string,
        textColor?: string,
        itemsTextColor?: string
    },
    currentUser: User
}


const SectionForm: React.FC<SectionFormProps> = ({ initialData, currentUser }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState(initialData?.backgroundColor ? initialData.backgroundColor : currentUser.backgroundColor ? currentUser.backgroundColor : "#01161E")
    const [textColor, setTextColor] = useState(initialData?.textColor ? initialData.textColor : currentUser.textColor ? currentUser.textColor : "#CFE3E9")
    const [itemsBackgroundColor, setItemsBackgroundColor] = useState(initialData?.itemsBackgroundColor ? initialData.itemsBackgroundColor : currentUser.backgroundColor ? currentUser.backgroundColor : "#01161E")
    const [itemsTextColor, setItemsTextColor] = useState(initialData?.itemsTextColor ? initialData.itemsTextColor : currentUser.textColor ? currentUser.textColor : "#CFE3E9")

    const toastMessage = initialData ? "Section Updated" : "Section Created"
    const action = initialData ? "Save Changes" : "Create"
    const form = useForm<SectionFormValues>({
        resolver: zodResolver(formSchema),

        defaultValues: initialData ? { ...initialData } : {
            name: "",
            about: "",
            isActive: true,
            template: ""

        },
    });

    const onSubmit = async (data: SectionFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                console.log(data)
                await axios.patch(`/api/${currentUser.id}/section/${initialData.id}`, { ...data, backgroundColor, textColor, itemsBackgroundColor, itemsTextColor })
            } else {
                await axios.post(`/api/${currentUser.id}/section`, { ...data, backgroundColor, textColor, itemsBackgroundColor, itemsTextColor })
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
                <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="md:w-1/3 w-full">

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

                        name="template"
                        render={({ field }) => (
                            <FormItem className="w-full md:flex-1">
                                <Select
                                    required={true}
                                    disabled={loading || Boolean(initialData?.template)}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select a Template"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent style={{}} className="max-h-[200px] overflow-y-scroll">
                                        {templateList.map((template, index: number) => (
                                            <SelectItem
                                                key={index}
                                                className="w-full h-10 cursor-pointer my-1"
                                                value={template.label}
                                            >
                                                <p className="flex items-center gap-4">
                                                    <template.icon
                                                        className={cn("h-5 w-5 ", template.color)}
                                                    />
                                                    <span>{template.label}</span>
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

                <Dialog>
                    <DialogTrigger asChild>
                        <Button style={{ backgroundColor: backgroundColor, color: textColor }} className="w-full py-2 my-1">Set Section Apperance</Button>
                    </DialogTrigger>
                    <DialogContent style={{ backgroundColor: backgroundColor, color: textColor }} className="overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                Set Section Apperance
                            </DialogTitle>
                        </DialogHeader>
                        <div style={{ backgroundColor: backgroundColor, color: textColor }} className={`rounded-lg  w-full    items-center justify-around h-fit flex flex-col md:flex-row  `}>
                            <div className="md:w-1/3 flex flex-col items-center justify-center">
                                <p >Set Section background color</p>

                                <HexColorPicker className="py-2 w-full" color={backgroundColor} onChange={setBackgroundColor} />
                                <Input className="text-black" value={backgroundColor} onChange={(e) => { e.preventDefault(); setBackgroundColor(e.target.value) }} />
                            </div>
                            <div className="md:w-1/3 flex flex-col items-center">
                                <p>Set Section text color</p>

                                <HexColorPicker className="py-2 w-full" color={textColor} onChange={setTextColor} />
                                <Input className="text-black" value={textColor} onChange={(e) => { e.preventDefault(); setTextColor(e.target.value) }} />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>



                <Dialog>
                    <DialogTrigger asChild>
                        <Button style={{ backgroundColor: itemsBackgroundColor, color: itemsTextColor }} className="w-full py-2 my-1">Set Items Apperance</Button>
                    </DialogTrigger>
                    <DialogContent style={{ backgroundColor: itemsBackgroundColor, color: itemsTextColor }} className="overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                Set Items Apperance
                            </DialogTitle>
                        </DialogHeader>
                        <div style={{ backgroundColor: itemsBackgroundColor, color: itemsTextColor }} className={`rounded-lg  w-full    items-center justify-around h-fit flex flex-col md:flex-row  `}>

                            <div className="md:w-1/3 flex flex-col items-center">
                                <p >Set template background color</p>

                                <HexColorPicker className="py-2 w-full" color={itemsBackgroundColor} onChange={setItemsBackgroundColor} />
                                <Input className="text-black" value={itemsBackgroundColor} onChange={(e) => { e.preventDefault(); setItemsBackgroundColor(e.target.value) }} />
                            </div>
                            <div className="md:w-1/3 flex flex-col items-center">
                                <p>Set template text color</p>

                                <HexColorPicker className="py-2 w-full" color={itemsTextColor} onChange={setItemsTextColor} />
                                <Input className="text-black" value={itemsTextColor} onChange={(e) => { e.preventDefault(); setItemsTextColor(e.target.value) }} />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>


        


            <Button disabled={loading} className="ml-auto py-2 w-full md:w-1/3 bg-dark" type="submit">
                {action}
            </Button>
        </form>
        </Form >
    )
}

export default SectionForm