"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus, Unlink, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface ExistingSocialscardProps {
    social: {
        id: string,
        platform: string,
        username: string | null,
        url: string
    },
    platformIcon: React.ReactNode,
    onDelete: (id: string) => void
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
        <Link className="flex gap-4 items-center justify-around" href={social.url} target='_blank'>

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
            <div className="md:col-span-1  flex items-center justify-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                type="button"
                                className="rounded-full h-8 w-8 my-2 "
                                size="icon"
                                variant="destructive"
                                onClick={() => onDelete(social.id)}
                            >
                                <Unlink className="h-3 w-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unlink {social.platform}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Link>
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

