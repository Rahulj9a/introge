import Footer from "@/components/headersAndFooters/footer";
import Sidebar from "@/components/headersAndFooters/mainSideBar";
import SubNav from "@/components/headersAndFooters/mainSubNav";
import Navbar from "@/components/headersAndFooters/navbar";
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import { User } from "@prisma/client";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    let { currentUser } = await serverAuth();
    
    return (
        <>
            <Navbar currentUser={currentUser ? currentUser as any : null} SubNav={SubNav} />
             {children} 
             <Footer />
        </>
    );
};

export default Layout;
