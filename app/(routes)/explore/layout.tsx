 import React from "react";
import MobileSidebar from "./components/sideBarMobile";
import SideBar from "./components/sideBar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {

    return (
        <div className="pt-14 bg-darkest">
            <div className="hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y- z-[80] bg-gray-900">
                <SideBar />
            </div>
            <div className="fixed md:pl-56 flex gap-2 items-center pt-2 text-light px-4 font-bold text-2xl">
                <MobileSidebar /> <p>Explore</p>
            </div>

            <main className="bg-darkest md:pl-56 pt-12">{children}</main>
        </div>
    );
};

export default Layout;