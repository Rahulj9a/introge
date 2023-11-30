"use client"

import UserCard from '@/components/userCard';
import { UseUser } from '@/hooks/useUser';
import { User } from '@prisma/client';
import { useSearchParams } from 'next/navigation'
import { encode } from 'punycode';
import React from 'react'

interface ResultListProps{
  currentUser?:User
}

const ResultList:React.FC<ResultListProps> = ({currentUser}) => {
  const search = useSearchParams();
  const searchQuery = search?search.get("q"):null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const {data:Users, isLoading} = UseUser(encodedSearchQuery)
 
  const data = (searchQuery && currentUser?.labels)?Users?.data.filter((user:User)=>user.labels.some(tag=>currentUser.labels.includes(tag))):Users?.data
 
  return (
    <div className='w-full h-fit px-2 flex flex-wrap gap-4'>
      {data?data.map((user:User)=> <UserCard key={user.id} data={user}/>):null}
   
    </div>
  )
}

export default ResultList