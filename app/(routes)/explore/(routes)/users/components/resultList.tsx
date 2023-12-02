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
  const searchQuery = search?search.get("username"):null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const {data:Users, isLoading} = UseUser(encodedSearchQuery)
 
  const data = Users?.data
 if(!searchQuery){
  return null
 }
  return (
    <div className='flex flex-col w-full h-fit px-2 gap-4'>
      <h2 className='text-light text-xl'>Search Result:</h2>
        <div className='flex flex-wrap gap-4'>
       {data?data.map((user:User)=> <UserCard key={user.id} data={user}/>):null}
       </div>
    </div>
  )
}

export default ResultList

      