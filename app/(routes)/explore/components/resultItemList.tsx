"use client"

import UserCard from '@/components/userCard';
import { UseUser } from '@/hooks/useUser';
import { User } from '@prisma/client';
import { useSearchParams } from 'next/navigation'
import { encode } from 'punycode';
import React from 'react'

const ResultList = () => {
  const search = useSearchParams();
  const searchQuery = search?search.get("q"):null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const {data:Users, isLoading} = UseUser(encodedSearchQuery)
  if(isLoading){
    console.log("loading")
  }
  const data = Users?.data
 
  return (
    <div className='w-full h-fit px-2 flex flex-wrap gap-4'>
      {data?data.map((user:User)=> <UserCard key={user.id} data={user}/>):null}
   
    </div>
  )
}

export default ResultList