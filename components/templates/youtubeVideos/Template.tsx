"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
 import { SectionItem } from "@prisma/client";
import {  Pencil, Trash } from "lucide-react";
 import { useEffect, useState } from "react";

interface BlogTemplateProps {
  data: SectionItem;
  onDelete?: () => void;
  onEdit?: () => void;
  backgroundColor?:string,
    textColor?:string
}

 
const YoutubeTemplate: React.FC<BlogTemplateProps> = ({
  data,
  onDelete,
  onEdit,
  backgroundColor,
    textColor
}) => {
  const [isMounted, setIsMounted] = useState(false);
 
   useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const videoId = (url: string) => {
    const regex =
      /^https?:\/\/(?:www\.)?youtu\.?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/|u\/\w+\/|app\/)?([^#\&\?]*).*/i;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  };
  return (
    <div style={{backgroundColor:backgroundColor, color:textColor}} className="w-[300px] shadow-gray-500 md:w-[500px] h-fit flex items-center justify-center  rounded-md sh relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_20px] ">
      {onDelete ? (
        <div className="rounded-md z-20 absolute -top-2 -right-2">
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
      {data.url && (
        <iframe
          width="330"
          height="186"
          src={`https://www.youtube.com/embed/${videoId(data.url)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="rounded-md w-[330px] h-[185px] md:w-[550px] md:h-[310px]"
        ></iframe>
      )}
    </div>
  );
};
export default YoutubeTemplate;
