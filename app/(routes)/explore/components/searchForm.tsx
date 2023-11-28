"use client"
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { encode } from 'punycode';
import SuggestionBox from './suggestionBox';

interface SearchFormProps {


}

const SearchForm: React.FC<SearchFormProps> = ({ }) => {
    const [input, setInput] = useState("")
    const router = useRouter()
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (input.length < 2) {
            alert("Invalid search value")
        }
        const encodedSearchQuery = encodeURI(input);
        router.push(`/explore?q=${encodedSearchQuery}`)


    }

    return (
        <>
            <form className="flex gap-2 items-center w-full" onSubmit={onSubmit}>
                <input onChange={(e) => { e.preventDefault(); setInput(e.target.value) }} value={input} className="flex-1 px-1 h-10 rounded-md bg-light text-dark text-lg"></input>
                <Button className="w-10 h-10 rounded-md bg-light hover:bg-mid" size="icon" onSubmit={onSubmit}>
                    <Search className="w-4 h-4 text-dark" />
                </Button>
                
            </form>
            {input.length>2 && <SuggestionBox input={input}/>}
        </>
    )
}

export default SearchForm