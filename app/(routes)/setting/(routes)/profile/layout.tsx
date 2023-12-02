 
import { serverAuth } from "@/lib/serverAuth";
import React from "react";
 
 
import { redirect } from "next/navigation";
import EditProfilePage from "./page";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  
  return (
    <div>
      {/*  <Navbar currentUser={currentUser as any}/> */}
       {children}
      </div>
  );
};

export default Layout;