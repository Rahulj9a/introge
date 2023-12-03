"use client"
import UserCard from '@/components/userCard';
import { UseUser } from '@/hooks/useUser';
import { User } from '@prisma/client';
import { useSearchParams } from 'next/navigation'
import { encode } from 'punycode';
import React, { useState } from 'react'
import FilterBar from './filterBar';

interface ResultListProps {
  currentUser?: User
}


const ResultList: React.FC<ResultListProps> = ({ currentUser }) => {
  const search = useSearchParams();
  const searchNameQuery = search ? search.get("username") : null;
  const encodedNameQuery = encodeURI(searchNameQuery || "");
  const [labels, setLabels] = useState<string[]>([])

  const handleNewLabel = (input: string) => {
    if (labels.includes(input)) {
      setLabels([...labels].filter((label: string) => label !== input))
    } else {
      setLabels([...labels, input])
    }
  }
  console.log(labels)
  const { data: Users, isLoading, error } = UseUser({ encodedNameQuery })


  if (encodedNameQuery === "" && labels.length === 0) {
    return <div className='flex flex-col w-full h-fit px-2'>
      <FilterBar onClick={handleNewLabel} selectedLabels={labels} />
    </div>
  }

  if (isLoading) {
    return <div className='text-light w-full h-fit px-2 flex items-center justify-center'>
      Loading...
    </div>

  }
  console.log(Users?.data)
  const data = labels.length > 0 ? [...Users?.data].filter((user: User) => !labels.some(tag => !user.labels.includes(tag))) : [...Users?.data]
  console.log(data)
  return (
    <div className='flex flex-col w-full h-fit px-2 gap-4'>
      <FilterBar onClick={handleNewLabel} selectedLabels={labels} />

      <h2 className='text-light text-xl'>Search Result:</h2>
      <div className='flex flex-wrap gap-4'>
        {data && data.length !== 0 ? data.map((user: User) => <UserCard key={user.id} data={user} />) : <div className='text-light'>No Result Found</div>}
      </div>
    </div>
  )
}

export default ResultList

