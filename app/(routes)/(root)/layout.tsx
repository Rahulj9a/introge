import React from "react"

interface LayoutProps {
    children: React.ReactNode
}



const layout: React.FC<LayoutProps> = async({ children }) => {
     
     
     
    return (
        <div className=" h-fit bg-light w-full min-h-screen max-h-fit ">
             {children}
        </div>
    )
}

export default layout