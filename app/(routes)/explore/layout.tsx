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
            <div className=" md:pl-56 flex gap-2 py-2 items-center text-light px-4 font-bold text-2xl">
                <MobileSidebar /> <p>Explore</p>
            </div>

            <main className="bg-darkest md:pl-56">{children}</main>
        </div>
    );
};

export default Layout;