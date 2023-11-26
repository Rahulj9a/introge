
import React from 'react'
import  prisma from '@/lib/prismadb'
import { User } from '@prisma/client'

interface SuggestionBoxProps {
   
}

const SuggestionBox: React.FC<SuggestionBoxProps> = async( ) => {
    const data:User[] = []

    return (
        <>
            {<div className='w-full h-[300px] z-10 overflow-x-hidden overflow-y-clip bg-dark text-light absolute m-0 top-14 rounded-lg p-2'>
                {data && data?.map(data=>
                    <div key={data.id}>{data.name}</div>
                )}
            </div>}
        </>
    )
}

export default SuggestionBox