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
import axios from "axios"


interface RegisterModalProps {
  refetch?: () => void; // Assuming refetch is a function that doesn not take any arguments and returns void
}

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(3, {
    message: "Username must be atleast 3 character long"
  }),
  name: z.string().min(3, {
    message: "Name must be atleast 3 character long"
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

const RegisterModal: React.FC<RegisterModalProps> = ({ refetch }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      name: "",
/*       password: "",
 */    },
  });
  const [isLoading, setisLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const onToggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setisLoading(true);
      await axios.post("/api/register", values)

      await signIn("credentials", values);
      toast.success("Register Successfull");

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Modal
      title="Register"
      description="Create a new account"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    >
      <div>
        <div className="space-y-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Your Email"
                        type="email"
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
              {/*               <FormField
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
               />*/}
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button className="w-full" disabled={isLoading} type="submit">
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="text-neutral-400 text-center mt-4">
          <p>
            Already registered?{" "}
            <span
              className="text-neutral-800 hover:text-black cursor-pointer font-medium hover:underline"
              onClick={onToggle}
            >
              Login!
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal
