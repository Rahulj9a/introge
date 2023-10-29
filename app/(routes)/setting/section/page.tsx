import React from 'react'
import Sectioncard from './components/sectioncard'
import prisma from '@/lib/prismadb'
import { serverAuth } from '@/lib/serverAuth'
import { redirect } from 'next/navigation'
 


const Page = async () => {
  const {currentUser} = await serverAuth()
  if(!currentUser){
    redirect("/")
  }
  const sections = await prisma.section.findMany({
    where:{
      userid:currentUser.id
    }
  })
    return(
      <div className='p-5'>
        <Sectioncard />
        {sections?sections.map(section => <Sectioncard data={section} user={currentUser}/>):null}
      </div>
    )
}

export default Page