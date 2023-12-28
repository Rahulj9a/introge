 
 import React from "react";
 
 
  
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