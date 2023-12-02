import * as React from "react";
import Navbar from "./Navbar";

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default NavbarLayout;
