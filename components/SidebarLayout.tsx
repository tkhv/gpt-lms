import * as React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default Layout;
