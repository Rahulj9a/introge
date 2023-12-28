
import { cn } from "@/lib/utils"
import Image from "next/image"

interface UserAvatarProps {
    className?: string
    userPic?: string
    username: string
    name?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ className, userPic, username, name }) => {
    return (
        <div className={cn("flex rounded-full border-[1px] border-transparent hover:border-white gap-4 justify-center items-center space-x-2 p-1 cursor-pointer", className)}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-black font-bold">
                {userPic ? <Image width={500} height={500} src={userPic} alt={username} className="rounded-full object-cover w-8 h-8"/> : <p>{username[0]}</p>}
            </div>
             
            {name ? <div className="pr-1">
                <p className="text-base   font-serif">{name}</p>
                <p className="text-xs  font-mono">@{username}</p>
            </div>
                : ""}
        </div>
    )
}

export default UserAvatar