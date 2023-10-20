import React from 'react'
import { LogOutIcon, User } from 'lucide-react'
import UserAvatar from '@/components/userAvatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface HeaderUserAvatarProps{
    currentUser: {
        id: string
        name: string
        username: string
        profilepic: string
    }
}

const HeaderUserAvatar:React.FC<HeaderUserAvatarProps> = ({currentUser}) => {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <UserAvatar username={currentUser.username} userPic={currentUser?.profilepic} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56 mt-2 mr-2 '>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/setting/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>

                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        <span>Sign out</span>

                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default HeaderUserAvatar
