'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

import { cn } from '@/lib/utils'

interface UserAvatarProps {
    className?: string
    userPic?: string
    username: string
    name?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ className, userPic, username, name }) => {
    
    return (
        <div className={cn("flex rounded-full items-center space-x-2 border-2 p-1 cursor-pointer", className)}>
            <Avatar className="h-9 w-9">
                 <AvatarImage src={userPic} alt={username}></AvatarImage> 
                <AvatarFallback>{username?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            {name ? <div className='pr-1'>
                <p className='text-base text-slate-900'>{name}</p>
                <p className='text-xs text-gray-600 '>{username}</p>
            </div>
                : ""}
        </div>
    )
}

export default UserAvatar