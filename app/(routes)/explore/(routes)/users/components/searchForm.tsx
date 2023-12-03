"use client"
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
 import SuggestionBox from './suggestionBox';
import FilterBar from './filterBar';

interface SearchFormProps {


}

const SearchForm: React.FC<SearchFormProps> = ({ }) => {
    const [input, setInput] = useState("")
    const [labels,setLabels] = useState("")
    const router = useRouter()
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (input.length < 2 && labels.length<2) {
            alert("Invalid search value")
        }
        const encodedSearchUserNameQuery = encodeURI(input);
        const encodedSearchLabelQuery = encodeURI(labels)
        router.push(`/explore/users?username=${encodedSearchUserNameQuery}&labels=${encodedSearchLabelQuery}`)


    }
    const handleLabel = (newlabel:string)=>{
        if(!labels.split(",").includes(newlabel)){
            if(labels.length===0){
                setLabels(newlabel)
            }else{
                setLabels(labels+","+ newlabel)
            }
        }else{
            const mod = [...labels.split(",")].filter(e=>e!==newlabel)
            console.log(mod)
            setLabels(mod.join(","))
        }
        
    }
  
    return (
        <div className='w-full relative'>
            <form className="flex gap-2 relative items-center w-full" onSubmit={onSubmit}>
                <input onChange={(e) => { e.preventDefault(); setInput(e.target.value) }} value={input} className="flex-1 px-1 h-10 rounded-md bg-light text-dark text-lg"></input>
                <Button className="w-10 h-10 rounded-md bg-light hover:bg-mid" size="icon" onSubmit={onSubmit}>
                    <Search className="w-4 h-4 text-dark" />
                </Button>
                <div>
                    <FilterBar onClick={(label)=>handleLabel(label)} selectedLabels={labels}/>
                </div>
                
            </form>
            <div className='absolute w-full top-14 z-10'>
            {input.length>2 && <SuggestionBox input={input}/>}
            </div>
        </div>
    )
}

export default SearchForm