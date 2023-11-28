
import React from 'react'
import { User } from '@prisma/client'
import { UseUser } from '@/hooks/useUser'
import { UseUserSuggestion } from '@/hooks/useUserSuggestion'
import Image from 'next/image'

interface SuggestionBoxProps {
    input?: string
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ input = "" }) => {
    const { data: response, isLoading, error, refetch } = UseUserSuggestion(input)
    if (isLoading) {
        return <div className='w-full z-10 h-fit bg-dark text-light text-center absolute m-0 top-14 rounded-lg p-2'>Loading...</div>
    }
    if (error) {
        return <div className='w-full z-10 h-fit bg-dark text-light text-center absolute m-0 top-14 rounded-lg p-2'>Something went wrong</div>

    }
    const users: User[] = response?.data

    if (users.length == 0 && !isLoading && !error) {
        return <div className='w-full z-10 h-fit bg-dark text-light text-center absolute m-0 top-14 rounded-lg p-2'>No result found</div>

    }
    return (
        <>
            {<div className='w-full max-h-[300px] p-2 z-10 overflow-x-hidden overflow-y-scroll bg-dark text-light absolute m-0 top-14 rounded-lg'>
                {users && users?.filter(e => e.username.includes(input as string)).map((user: User) =>
                    <div key={user.id} className=' w-full rounded-md my-1 p-1 items-center gap-2 bg-light text-darkest flex'>
                        <div className='flex gap-2 items-center flex-1' ><Image width={50} height={50} className="object-contain w-8 h-8 rounded-full" alt={user.name as string} src={user.profilepic as string} />
                            <span>{user.name}</span>
                            <span className='text-xs'>@{user.username}</span>
                        </div>
                        <div className="flex flex-wrap  rounded-sm px-2 py-1 gap-[2px] h-auto ">
                            {user.labels &&
                                user.labels.map(
                                    (label: string, index: number) =>
                                        index < 3 && (
                                            <div
                                                key={label}
                                                className=" text-[10px]  text-darkest"
                                            >
                                                {label} |
                                            </div>
                                        )
                                )}

                        </div>
                    </div>
                )}
            </div>}
        </>
    )
}

export default SuggestionBox