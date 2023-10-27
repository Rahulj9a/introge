import Navbar from "@/components/headersAndFooters/navbar";
import { serverAuth } from "@/lib/serverAuth";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
    let { currentUser } = await serverAuth();

    return (
        <div >
            <Navbar currentUser={currentUser as any} />
            <div >{children}</div>
        </div>
    );
};

export default Layout;
