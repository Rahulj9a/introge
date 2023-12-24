import React from 'react'
import { LayoutList, LogOutIcon, Settings, User } from 'lucide-react'
import UserAvatar from '@/components/userAvatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface HeaderUserAvatarProps {
    currentUser: {
        id: string
        name: string
        username: string
        profilepic: string
    }
}

const HeaderUserAvatar: React.FC<HeaderUserAvatarProps> = ({ currentUser }) => {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <UserAvatar username={currentUser.username} userPic={currentUser?.profilepic} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56 mt-2 mr-2 '>
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => router.push(`/${currentUser.username}`)}>
                        <UserAvatar className='w-full border-none' username={currentUser.username} userPic={currentUser.profilepic} name={currentUser.name} />

                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/setting/profile")}>
                        <User className="mr-4 h-4 w-4" />
                        <span>Edit Profile</span>

                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/setting/section")}>
                        <LayoutList className="mr-4 h-4 w-4 " />
                        <span>Sections</span>

                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>

                    <DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
                        <LogOutIcon className="mr-4 h-4 w-4" />
                        <span>Sign out</span>

                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default HeaderUserAvatar
