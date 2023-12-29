
import React from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface ShareModalProps {
  link: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ link = "Hello" }) => {

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);

      toast.success("Link copied to clipboard")
    } catch (err) {
      toast.error("Error copying to clipboard");
    }
  };
  return (
    <div className="max-h-[70vh] overflow-y-auto w-full ">
      <div className="flex w-full flex-wrap bg-blue-950 p-2 items-center rounded-md text-white">
        <p className="flex-1 h-fit md:block md:text-sm gap-2 text-xs" id="link">{link}</p>
        <Button size="icon" className="hover:bg-gray-800 hidden flex-1 lg:flex-none lg:flex" onClick={copyToClipboard}>
          <Copy />
        </Button>
      </div>
    </div>
  );
};

export default ShareModal;
