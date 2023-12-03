"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus, Unlink, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface ExistingSocialscardProps {
    social: {
        title: string,
        username: string | null,
        url: string
    },
    platformIcon: React.ReactNode,
    onDelete: () => void
}
interface ExsitingLabelscardprops {
    value: string,
    onClick: (value: string) => void,
    disabled: boolean,
    exist: boolean
}

export const ExistingSocialscard: React.FC<ExistingSocialscardProps> = ({ social, platformIcon, onDelete }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (
        <div className='flex items-center justify-center px-3'>
        <Link className="flex items-center justify-around flex-1 " href={social.url} target='_blank'>

            {platformIcon}


            <div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <p>@{social.username}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs font-thin ">{social.url}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Link>
        <div className="md:col-span-1  flex items-center justify-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                
                                className="rounded-full h-8 w-8 my-2 bg-red-600 hover:bg-red-400 flex items-center justify-center text-white"
                                
                                
                                onClick={onDelete}
                            >
                                <Unlink className="h-4 w-4" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unlink {social.title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

        </div>
    )
}

export const ExsitingLabelscard: React.FC<ExsitingLabelscardprops> = ({ exist, value, onClick, disabled, }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (
        <div className={`flex w-fit items-center px-2 py-1 rounded-full gap-2 justify-start flex-wrap ${exist ? "bg-gray-300 border-[1px] text-black" : "bg-gray-700 text-white"}`}>
            <p className='font-mono text-sm'>
                {value}
            </p>
            {exist ? <Button disabled={disabled} className='w-6 h-6 rounded-full' type='button' variant="destructive" size="icon" onClick={() => { onClick(value) }}>
                <X className='w-4 h-4' />
            </Button> : <Button disabled={disabled} className='w-6 h-6 rounded-full' type='button' variant="secondary" size="icon" onClick={() => { onClick(value) }}>
                <Plus className='w-4 h-4' />
            </Button>
            }
        </div>
    )
}

