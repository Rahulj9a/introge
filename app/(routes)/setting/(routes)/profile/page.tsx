

 
import { User } from '@prisma/client'
import React, { useState } from 'react'
import ProfileImage from './components/profileImage'
import ProfileForm from './components/editProfileForm'
import { redirect } from 'next/navigation'
import { serverAuth } from '@/lib/serverAuth'
import SocialForm from './components/editSocialForm'

interface EditProfilePageProps {
   
}

const EditProfilePage: React.FC<EditProfilePageProps> =  async( ) => {
  let { currentUser } = await serverAuth();
    
  if(!currentUser){
    redirect("/")
  }
  let user = await prisma?.user.findUnique({
    where:{
      id:currentUser.id
    },
    include:{
      socials:true
    }
  })

  
   
 
  return (
    <div className='md:px-8 px-4 py-4'>
      <div className='flex flex-col items-center justify-start '>
         
         <ProfileForm   initialData={user as any}/>
         <SocialForm userid={currentUser.id as string} username={currentUser.username as string} initialData={user?.socials as []}/>
      </div>
    </div>
  )
}

export default EditProfilePage