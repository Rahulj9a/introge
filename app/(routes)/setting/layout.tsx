import Navbar from "@/components/headersAndFooters/navbar";
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
import SideBar from "./components/sideBar";
import MobileSidebar from "./components/sideBarMobile";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  let { currentUser } = await serverAuth();

  if(!currentUser){
    redirect("/")
  }
  return (
    <div className="pt-14">
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

export default Layout;
