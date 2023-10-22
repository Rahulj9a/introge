"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Delete, LucideDelete, Pencil, RemoveFormatting, Trash, UserCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ProfileImageProps {
    onChange: (base64?: string|null) => void;

    value?: string | null
    disabled: boolean;
}
const ProfileImage: React.FC<ProfileImageProps> = ({
    onChange,

    value,
    disabled,
}) => {
    const [base64, setBase64] = useState(value);
    const handleChange = useCallback(
        (base64: string) => {
            onChange(base64);
        },
        [onChange, base64],
    );
    const removeImage = () => {
        setBase64(undefined);
        onChange(null)
    }

    const handleDrop = useCallback(
        (files: any) => {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setBase64(event.target.result);
                handleChange(event.target.result);
            };
            reader.readAsDataURL(file);
        },
        [handleChange],
    );

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });
    return (
        <div className="relative w-48 h-48 rounded-full">
            


                <div className="p-2 w-8 h-8 absolute bottom-1 bg-white flex items-center justify-center right-1 shadow-sm shadow-black rounded-full z-20 cursor-pointer bg-opacity-70">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div {...getRootProps({ className: "" })}>
                                    <input {...getInputProps()} />
                                    <Pencil className=" w-6 h-6" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit Image</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
                <div className="p-1 absolute w-8 h-8 shadow-sm shadow-black right-1 top-1 rounded-full z-20 cursor-pointer bg-white bg-opacity-70">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="rounded-full ">

                                <Trash className=" w-6 h-6 " onClick={() => removeImage()} />

                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Remove Image</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                {base64 ? (
                    <Image
                        className="shadow-lg shadow-black "
                        style={{
                            objectFit: "cover",
                            borderRadius: "100%",
                        }}
                        fill
                        src={base64}
                        alt="User"
                    />
                ) : (
                    <UserCircle2 className="text-gray-500 w-full h-full" />
                )}
            
        </div>
    );
};

export default ProfileImage;
