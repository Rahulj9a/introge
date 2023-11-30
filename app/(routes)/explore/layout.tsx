import Sidebar from "@/components/headersAndFooters/mainSideBar";
import { serverAuth } from "@/lib/serverAuth";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
 
    return (
        <div className="pt-14 bg-darkest">
            <div className="absolute md:hidden">
                <Sidebar />
            </div>
            <main className="bg-darkest">{children}</main>
        </div>
    );
};

export default Layout;