"use client"

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Section, User } from '@prisma/client'
import axios from 'axios'
import { Edit, Plus, Share, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface SectioncardProps {
    data?: Section

    user?: User
}
const Sectioncard: React.FC<SectioncardProps> = ({ data, user }) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }



    if (!data) {
        return (
            <div className='w-full h-24 rounded-lg bg-mid flex items-center justify-center'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant='ghost' className='rounded-full flex items-center justify-center w-18 h-18' onClick={() => router.push("/setting/section/new")}>
                                <Plus className='w-10 h-10 text-dark ' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent >
                            <span className="text-xs" >Add a new section</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider >

            </div>
        )
    }
    const onDelete = async () => {
        try {
            setLoading(true)

            await axios.delete(`/api/${user?.username}/section/${data.id}`)

            router.refresh()
            router.push(`/setting/section`)
            toast.success(`${data.name} deleted`)
        } catch (error: any) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='w-full h-28 rounded-lg my-5 bg-mid'>
            <div className='w-full h-28 px-5 py-1 rounded-lg bg-mid flex items-center justify-center'>
                <div className='flex-1 px-3 flex flex-col justify-around h-full'>
                    <h1 className='font-semibold text-2xl'>{data.name}</h1>
                    <p className='text-sm'>{data.about}</p>
                    <div className='w-fit h-fit'><TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <span className={`w-2 h-2 rounded-full flex ${data.isActive ? "bg-green-800" : "bg-red-700"}`}></span>
                            </TooltipTrigger>
                            <TooltipContent >
                                <span className="text-xs" >{data.isActive ? "Active" : "Not Active"}</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider >
                    </div>

                </div>
                <div className='h-full w-9  flex flex-col items-center justify-around'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant='outline' disabled={loading} onClick={() => router.push(`/setting/section/${data.name}`)} className=' rounded-full flex items-center justify-center p-1 w-fit h-fit bg-light'>
                                    <Edit className='h-5 w-5 text-dark ' />

                                </Button>
                            </TooltipTrigger>
                            <TooltipContent >
                                <span className="text-xs" >Edit</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant='outline' disabled={loading} onClick={onDelete} className='rounded-full flex items-center bg-light justify-center p-1 w-fit h-fit'>
                                    <Trash className='text-red-700 w-5 h-5 ' />

                                </Button>
                            </TooltipTrigger>
                            <TooltipContent >
                                <span className="text-xs" >Delete</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant='outline' size='icon' className='rounded-full bg-light flex items-center justify-center p-1 w-fit h-fit'>
                                    <Share className='w-5 h-5 text-dark' />

                                </Button>
                            </TooltipTrigger>
                            <TooltipContent >
                                <span className="text-xs" >Share</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider >

                </div>
            </div>
        </div>
    )
}

export default Sectioncard