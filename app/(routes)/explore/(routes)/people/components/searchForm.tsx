"use client"
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import React, { useState } from "react"
import { useRouter } from "next/navigation";
import SuggestionBox from "./suggestionBox";
interface SearchFormProps {


}

const SearchForm: React.FC<SearchFormProps> = ({ }) => {
    const [input, setInput] = useState("")
    const router = useRouter()
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const encodedSearchUserNameQuery = encodeURI(input);
        router.push(`/explore/people?username=${encodedSearchUserNameQuery}`)


    }

    return (
        <div className="flex-1 relative">
            <form className="flex gap-2 relative items-center w-full" onSubmit={onSubmit}>
                <input onChange={(e) => { e.preventDefault(); setInput(e.target.value) }} value={input} className="flex-1 px-1 h-10 rounded-md bg-light text-dark text-lg"></input>
                <Button className="w-10 h-10 rounded-md bg-light hover:bg-mid" size="icon" onSubmit={onSubmit}>
                    <Search className="w-4 h-4 text-dark" />
                </Button>

            </form>
            <div className="absolute w-full top-14 z-10">
                {input.length > 2 && <SuggestionBox input={input} />}
            </div>
        </div>
    )
}

export default SearchForm