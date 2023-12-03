"use client"
import UserCard from '@/components/userCard';
import { UseUser } from '@/hooks/useUser';
import { User } from '@prisma/client';
import { useSearchParams } from 'next/navigation'
import { encode } from 'punycode';
import React from 'react'

interface ResultListProps {
  currentUser?: User
}


const ResultList: React.FC<ResultListProps> = ({ currentUser }) => {
  const search = useSearchParams();
  const searchNameQuery = search ? search.get("username") : null;
  const searchLabelQuery = search ? search.get("labels") : null
  const encodedNameQuery = encodeURI(searchNameQuery || "");
  const encodedLabelQuery = encodeURI(searchLabelQuery || "")
  const { data: Users, isLoading, error } = UseUser({ encodedNameQuery, encodedLabelQuery })

  if(isLoading){
    return <div className='text-light w-full h-fit px-2 flex items-center justify-center'>
      Loading...
  </div>

  }
  if (error) {
    return <div className='text-light w-full h-fit px-2 flex items-center justify-center'>
      Something went wrong
    </div>
  }
  if (!Users) {
    return <div className='text-light w-full h-fit px-2 flex items-center justify-center'>
      No User found
    </div>

  }
  const data = Users?.data

  return (
    <div className='flex flex-col w-full h-fit px-2 gap-4'>
      <h2 className='text-light text-xl'>Search Result:</h2>
      <div className='flex flex-wrap gap-4'>
        {data && data.length!==0 ? data.map((user: User) => <UserCard key={user.id} data={user} />) : <div className='text-light'>No Result Found</div>}
      </div>
    </div>
  )
}

export default ResultList

