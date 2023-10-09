import Navbar from '@/components/headersAndFooters/navbar'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}

export default layout