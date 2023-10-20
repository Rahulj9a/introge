

 
import { User } from '@prisma/client'
import React, { useState } from 'react'
import ProfileImage from './components/profileImage'
import ProfileForm from './components/editProfileForm'
import { redirect } from 'next/navigation'
import { serverAuth } from '@/lib/serverAuth'

interface EditProfilePageProps {
   
}

const EditProfilePage: React.FC<EditProfilePageProps> =  async( ) => {
  let { currentUser } = await serverAuth();

  if(!currentUser){
    redirect("/")
  }
   
 
  return (
    <div className='md:px-8 px-4 py-4'>
      <div className='flex items-center justify-start '>
         <ProfileForm initialData={currentUser as any}/>
      </div>
    </div>
  )
}

export default EditProfilePage