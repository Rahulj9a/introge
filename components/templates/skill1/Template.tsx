"use client";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLinkPreview } from "@/hooks/useLinkPreview";
import { SectionItem } from "@prisma/client";
import { Edit, Pencil, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Skill1TemplateProps {
    data: SectionItem;
    onDelete?: () => void;
    onEdit?: () => void;
}

const getlinkpreview = async (url: string) => {
    const reponse = await useLinkPreview(url as string);
    return reponse.data;
};

const Skill1Template: React.FC<Skill1TemplateProps> = ({
    data,
    onDelete,
    onEdit
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
        <div className="w-[170px] min-h-[200px] max-h-[280] flex flex-col items-center rounded-md sh relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_30px] shadow-black">
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
                <div className="w-full p-2 items-center flex flex-col gap-2">
                    {/* Priority for showing Image--> ImageURL -> URL fetched image -> Text */}
                    <div className="w-20 h-20 rounded-full">
                        {data.imageURL ? (
                            <img src={data.imageURL} className="rounded-lg" />
                        ) : previewdata && previewdata.image ? (
                            <img src={previewdata?.image} className="rounded-lg" />
                        ) : (
                            <div className="w-20 h-20 bg-black text-white text-center flex items-center justify-center rounded-full">
                                {data.name}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center justify-around flex-1">
                        <h1 className="text-lg font-semibold">{data.name}</h1>
                        <p className="text-xs ">{data.about}</p>
                     </div>
                </div>
            </Link>
        </div>
    );
};
export default Skill1Template;
