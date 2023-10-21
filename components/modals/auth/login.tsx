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
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
 
import { useRouter } from "next/navigation";
/* import { signIn } from "next-auth/react"; */

interface LoginModalProps {
  refetch?: () => void; // Assuming refetch is a function that doesn't take any arguments and returns void
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Please enter a valid username",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).",
      }
    ),
});

const LoginModal: React.FC<LoginModalProps> = ({ refetch }) => {
const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isLoading, setisLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setisLoading(true);
      const user = await signIn("credentials", values);
      
        toast.success("Login Successfull");


       

    } catch (error: any) {
       
      toast.error(error.message);
    } finally {
      setisLoading(false);
      router.push("/")
    }
  };

  return (
    <Modal
      title="Login"
      description="Login to your existing account"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    >
      <div>
        <div className="space-y-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Your username"
                        type="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button disabled={isLoading} type="submit">
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="text-neutral-400 text-center mt-4">
          <p>
            Not registered yet?{" "}
            <span
              className="text-neutral-800 hover:text-black cursor-pointer font-medium hover:underline"
              onClick={onToggle}
            >
              Regsiter Now!
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal
