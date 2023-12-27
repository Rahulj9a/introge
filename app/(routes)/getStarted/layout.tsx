import Sidebar from "@/components/headersAndFooters/mainSideBar";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {


    return (
        <div className="pt-10 bg-darkest">
            <div className="absolute md:hidden">
                <Sidebar />
            </div>
            <main className="bg-darkest">{children}</main>
            
        </div>
    );
};

export default Layout;