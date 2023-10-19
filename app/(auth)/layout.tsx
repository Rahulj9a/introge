import { ClerkProvider, auth } from '@clerk/nextjs'

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    return (
        <ClerkProvider>
            <div className="flex items-center justify-center h-full w-full">
                {children}
            </div>
        </ClerkProvider>
    );
};