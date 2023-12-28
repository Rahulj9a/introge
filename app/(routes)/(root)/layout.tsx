import Sidebar from "@/components/headersAndFooters/mainSideBar"
import Navbar from "@/components/headersAndFooters/navbar"
import { serverAuth } from "@/lib/serverAuth"
import React from "react"

interface LayoutProps {
    children: React.ReactNode
}



const layout: React.FC<LayoutProps> = async({ children }) => {
     
     
     
    return (
        <div className="box-decoration-clone bg-gradient-to-b from-light to-darkest h-fit pt-10 bg-light w-full min-h-screen max-h-fit ">
             {children}
        </div>
    )
}

export default layout