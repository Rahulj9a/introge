"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
/* import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal"; */
import { useEffect, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface SetupProps {
    userEmail:string
    refetch?: () => void; // Assuming refetch is a function that doesn't take any arguments and returns void
}

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    username: z.string().min(3, {
        message: "Username must be atleast 3 character long",
    }),
    name: z.string().min(3, {
        message: "Name must be atleast 3 character long",
    }),
    bio: z.string(),
});

const SetupPage: React.FC<SetupProps> = ({userEmail, refetch }) => {
    const router = useRouter();

   /*  const { user, isLoaded, isSignedIn } = useUser()  */
    const [isLoading, setisLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
            bio: "",
        },
    });
     
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log('hello')
        try {
            setisLoading(true);
            await axios.post("/api/register", { ...values, userEmail });

            await signIn("credentials", { ...values, userEmail });
            toast.success("Register Successfull");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setisLoading(false);
        }
    };
    
     
   

   

    return (
         
            <div className="space-y-4 pb-4">
                <p>
                    Your Email - <span>{userEmail}</span>
                </p>
                <Form {...form}>
                    <form onSubmit={( form.handleSubmit(onSubmit))}>

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Your Unique Username"
                                            type="text"
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
                                            disabled={isLoading}
                                            placeholder="Your Name"
                                            type="text"
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
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Hey I am ..."
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-6 space-x-2 flex items-center justify-end">
                             <Button size="lg" type="submit" disabled={isLoading}>
                                Register
                             </Button>
                                 
                        </div>
                    </form>
                </Form>
            </div>

        
    );
};

export default SetupPage;
