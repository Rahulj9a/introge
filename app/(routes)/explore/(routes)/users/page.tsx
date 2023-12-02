
import React, { useState } from "react";
import SearchForm from "./components/searchForm";
import ResultList from "./components/resultList";
import { serverAuth } from "@/lib/serverAuth";
import RecommendList from "./components/recommendItemList";

const Page = async () => {
    const { currentUser } = await serverAuth()

    return (
        <div className="mx-4 md:mx-8 flex min-h-screen py-2 max-h-fit">
            <div className="flex flex-col flex-1 gap-4">
                <SearchForm />
                <ResultList/>
                {currentUser &&
                    (
                        <div className="text-light">
                            <h2 className="text-xl">Recommends:</h2>
                            <RecommendList currentUser={currentUser || undefined} />
                        </div>
                    )
                }


            </div>

        </div>
    );
};

export default Page;
