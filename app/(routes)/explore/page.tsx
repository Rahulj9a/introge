
import prisma from "@/lib/prismadb";
import React, { useState } from "react";
import SuggestionBox from "./components/suggestionBox";
import SearchForm from "./components/searchForm";
import ResultList from "./components/resultItemList";
import { serverAuth } from "@/lib/serverAuth";

const Page = async() => {
    const {currentUser} = await serverAuth()
    
    return (
        <div className="mx-4 md:mx-8 min-h-screen  max-h-fit">
            <p className="text-xl text-mid my-3 w-full text-center">Explore</p>
            <div className="flex w-full mb-4 items-center gap-2 text-lg h-14 relative">
                <SearchForm  />
                 {/* <SuggestionBox/> */}

            </div>
            
            <ResultList currentUser={currentUser||undefined}/>
        </div>
    );
};

export default Page;
