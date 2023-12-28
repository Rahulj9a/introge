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
import { useCallback, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";


import { useRouter } from "next/navigation";
import RegisterModal from "./register";
/* import { signIn } from "next-auth/react"; */

interface LoginModalProps {
  refetch?: () => void; // Assuming refetch is a function that doesn"t take any arguments and returns void
}

 
const LoginModal: React.FC<LoginModalProps> = ({ refetch }) => {
  const router = useRouter()
  const register = useRegisterModal()
  const loginModal = useLoginModal();

  const onSubmit = async () => {
    try {
       const user = await signIn("google");
    



    } catch (error: any) {

      toast.error(error.message);
    } finally {
      toast.success("Successfully registered, visit edit profile to choose custom username")
     }
  };
  return (
    <Modal
      title="Join"
      description="Join or login to your account"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
    >
      <div>
        <Button className="w-full" onClick={onSubmit}>Google</Button>
      </div>
    </Modal>
  );
};

export default LoginModal
