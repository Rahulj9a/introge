import React from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface ShareModalProps {
  link: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ link="Hello" }) => {
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
      <div className="flex w-full bg-blue-950 p-2 items-center rounded-md text-white">
        <p className="flex-1 h-auto gap-2">{link}</p>
        <Button size="icon" onClick={copyToClipboard}>
          <Copy />
        </Button>
      </div>
    </div>
  );
};

export default ShareModal;
