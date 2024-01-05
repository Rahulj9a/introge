"use client";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { UseLinkPreview } from "@/hooks/useLinkPreview";
import { SectionItem } from "@prisma/client";
import {  Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogTemplateProps {
    data: SectionItem;
    onDelete?: () => void;
    onEdit?: () => void;
    backgroundColor?:string,
    textColor?:string
}

const getlinkpreview = async (url: string) => {
    const reponse = await UseLinkPreview(url as string);
    return reponse.data;
};

const BlogTemplate: React.FC<BlogTemplateProps> = ({
    data,
    onDelete,
    onEdit,
    backgroundColor,
    textColor
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const [previewdata, setPreviewData] = useState<{ image: string } | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetcheddata = await getlinkpreview(data.url as string);
                setPreviewData(fetcheddata);
            } catch (error) {
                setPreviewData(null);
            }
        };
        fetchData();
    }, [data.url]);
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null
    }
    return (
        <div style={{backgroundColor:backgroundColor, color:textColor}} className="w-fit rounded-md relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_20px] shadow-gray-500">
            {onDelete ? (
                <div className="rounded-md z-20 absolute flex gap-1 -top-2 -right-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button onClick={onDelete} variant="destructive" size="icon">
                                    <Trash className="w-6 h-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Remove</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button onClick={onEdit} variant="secondary" size="icon">
                                    <Pencil className="w-6 h-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
            ) : null}
            <Link href={data.url as string} target="_blank"  >
                <div className="snap-center w-[270px] p-2 min-h-[330px] max-h-fit  flex flex-col gap-2">
                    {/* Priority for showing Image--> ImageURL -> URL fetched image -> Text */}
                    <div className="w-full h-2/5 rounded-lg">
                        {data.imageURL ? (
                            <img src={data.imageURL} className="rounded-lg object-contain" />
                        ) : previewdata && previewdata.image ? (
                            <img src={previewdata?.image} className="rounded-lg object-contain" />
                        ) : (
                            <div className="w-full h-full bg-black text-white text-center flex items-center justify-center rounded-lg">
                                {data.name}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 justify-around flex-1">
                        <h1 className="text-lg font-semibold">{data.name}</h1>
                        <p className="text-xs ">{data.about}</p>
                        <div className="flex text-xs gap-1 flex-wrap">
                            {data.labels
                                ?.split(/\s*,\s*/)
                                .map((e, index) =>
                                    index < 3 && e.trim() !== ''? (
                                        <div key={index} className="py-1 px-2 rounded-md bg-black text-white">
                                            {e}
                                        </div>
                                    ) : null
                                )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default BlogTemplate;
