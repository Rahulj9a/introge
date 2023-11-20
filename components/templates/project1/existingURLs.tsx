import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Unlink } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ExistingUrlscardProps {
    title:string,
    index:string | number
    url:string,
    onDelete:(index:string|number)=>void
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
        <Link className="flex gap-4 items-center justify-around" href={url} target='_blank'>

            


            <div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <p>@{title}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs font-thin ">{url}</p>
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
                                onClick={() => onDelete(index)}
                            >
                                <Unlink className="h-3 w-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unlink {title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Link>
    )
}
