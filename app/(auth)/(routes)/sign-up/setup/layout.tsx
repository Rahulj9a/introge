import { currentUser } from '@clerk/nextjs'
import SetupPage from './page';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    const user = await currentUser()
    if(!user){
       redirect("/sign-in")
    }
     const userEmail = user.emailAddresses[0].emailAddress
    return (
        
            <div className="flex items-center justify-center h-full w-full">
                 <SetupPage userEmail={userEmail}/>
            </div>
        
    );
};