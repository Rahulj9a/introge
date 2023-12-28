

import UserCard from "@/components/userCard";
 import { User } from "@prisma/client";
 import React from "react"
 import prisma from "@/lib/prismadb"

interface RecommendListProps{
  currentUser?:User
}



const RecommendList:React.FC<RecommendListProps> = async({currentUser}) => {
  if(!currentUser){
    return null
  }
     const recommendedusers = await prisma.user.findMany({
      where:{
        labels: {
          hasSome:currentUser.labels
        },
        NOT:{
          id:currentUser.id
        }
       }
     })
   return (
    <div className="w-full h-fit my-2 flex flex-wrap gap-2 lg:gap-4">
      {recommendedusers && recommendedusers.length!==0?recommendedusers.map((user:User)=> <UserCard key={user.id} data={user}/>):<p className="text-xs">Nothing to show here, This could be due to no users with same interest. Add more labels to your profile to get more recommendations</p>}
   
    </div>
  )
}

export default RecommendList