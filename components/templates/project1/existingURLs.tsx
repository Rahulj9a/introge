import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ExternalLink, Unlink } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ExistingUrlscardProps {
    title: string,
    index: number
    url: string,
    
    onDelete?: (index: number) => void
}

export const ExistingUrlscard: React.FC<ExistingUrlscardProps> = ({ title, url, onDelete, index }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (

        <Link className="flex gap-2 py-2 px-2 items-center justify-around bg-mid text-darkest rounded-md hover:bg-brand hover:scale-105 text-xs w-fit h-fit" href={url} target='_blank'>




            <div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <p>{title}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-md ">{url}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {onDelete ? <div className="md:col-span-1  flex items-center justify-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                type="button"
                                className="rounded-full h-5 w-5 "
                                size="icon"
                                variant="destructive"
                                onClick={(e) => { e.preventDefault(); onDelete(index) }}
                            >
                                <Unlink className="h-3 w-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unlink {title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>:
            <ExternalLink className="h-3 w-3"/>
            }
        </Link >
    )
}
