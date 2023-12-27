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
import { Edit, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExistingUrlscard } from "./existingURLs";
import { useRouter } from "next/navigation";

interface Project1TemplateProps {
    data: SectionItem;
    backgroundColor?: string,
    textColor?: string
    onDelete?: () => void;
    onEdit?: () => void;
}

const getlinkpreview = async (url: string) => {
    const reponse = await useLinkPreview(url as string);
    return reponse.data;
};

const Project1Template: React.FC<Project1TemplateProps> = ({
    data,
    onDelete,
    onEdit,
    backgroundColor,
    textColor
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()
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
        <div style={{ backgroundColor: backgroundColor, color: textColor }} className="w-[290px] shadow-gray-500 h-fit flex flex-col rounded-md relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_20px] " >
            {onDelete ? (
                <div className="rounded-md flex gap-1 absolute z-20 -top-2 -right-2">
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

            <div className="w-full h-[400px] p-2 flex flex-col gap-2">
                <Link href={data.url as string} className="flex-1 flex flex-col" target="_blank">
                    {/* Priority for showing Image--> ImageURL -> URL fetched image -> Text */}
                    <div className="w-full aspect-[16/9] rounded-lg">
                        {data.imageURL ? (
                            <img src={data.imageURL} className="rounded-lg  w-full h-full object-contain " />
                        ) : previewdata && previewdata.image ? (
                            <img src={previewdata?.image} className="rounded-lg  w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full bg-black text-white text-center flex items-center justify-center rounded-lg">
                                {data.name}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-around flex-1">
                        <h1 className="text-base font-semibold flex items-center justify-between">{data.name} <span className="text-xs text-dark w-fit">{data.labels?.split(",")[0]}</span></h1>
                        <div className="flex text-xs gap-1 flex-wrap">
                            {data.labels
                                ?.split(/\s*,\s*/)
                                .map((e, index) =>
                                    index > 0 && index < 5 ? (
                                        <div key={index} className="py-1 px-2 rounded-md bg-black text-white">
                                            {e}
                                        </div>
                                    ) : null
                                )}
                        </div>
                        <p className="text-xs ">{data.about}</p>
                    </div>
                </Link>
                {data.otherURLs && <div className="flex text-xs gap-1 flex-wrap">
                    {JSON.parse(String(data?.otherURLs)).map((link: any, index: number) =>
                        <ExistingUrlscard index={index} key={index} title={link.title} url={link.url} />
                    )}
                </div>}

            </div>

        </div >
    );
};
export default Project1Template;