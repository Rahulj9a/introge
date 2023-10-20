import Navbar from "@/components/headersAndFooters/navbar";
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import SideBar from "./components/sideBar";
import MobileSidebar from "./components/sideBarMobile";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = async ({ children }) => {
  let { currentUser } = await serverAuth();

  return (
    <div>
      {/*  <Navbar currentUser={currentUser as any}/> */}
      <div className="hidden h-full md:flex md:w-56 md:flex-col md:fixed md:inset-y- z-[80] bg-gray-900">
        <SideBar />
      </div>
      <div className="md:hidden absolute">
        <MobileSidebar />
      </div>
      <main className="md:pl-56">{children}</main>
    </div>
  );
};

export default layout;
