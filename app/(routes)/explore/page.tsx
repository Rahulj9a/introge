"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const page = () => {
    const [input, setInput] = useState("")
    return (
        <div className="mx-4 md:mx-8 pt-14 min-h-screen max-h-fit">
            <div className="flex w-full items-center gap-2 text-lg h-14">
                <form className="flex gap-2 items-center w-full">
                    <input onChange={(e)=>{e.preventDefault(); setInput(e.target.value)}} className="flex-1 px-1 h-10 rounded-md bg-light text-dark text-lg"></input>
                    <Button className="w-10 h-10 rounded-md bg-light hover:bg-mid" size="icon" onSubmit={()=>console.log("")}>
                        <Search className="w-4 h-4 text-dark"/>
                    </Button>
                </form>

            </div>
        </div>
    );
};

export default page;
