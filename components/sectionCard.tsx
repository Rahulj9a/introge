"use client"
import { Section, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import prisma from "@/lib/prismadb";

import UserAvatar from './userAvatar'


interface SectionCardProps {
    section: Section,
    user: User
}
const SectionCard: React.FC<SectionCardProps> = ({ section, user }) => {
     


    return (
        <div
            key={section.id}
            style={{
                backgroundColor:
                    section.backgroundColor || "",
                color: section.textColor || "rgb(1,22,30)",
            }}
            className="w-72 relative  flex flex-col h-40 rounded-sm border-2 bg-mid border-light p-2"
        >
            <h1> {section.name}</h1>
            <p className="text-sm w-full h-fit">{section.about}</p>
            <div className="text-sm absolute flex justify-between m-0 bottom-0 right-0">

                 <UserAvatar username={user.username as string} userPic={user.profilepic as string} />
            </div>
        </div>
    )
}

export default SectionCard