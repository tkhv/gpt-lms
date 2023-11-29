import * as React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { CourseList } from "@/lib/types";

const NavbarLayout = ({
  children,
  courseList,
}: {
  children: React.ReactNode;
  courseList: CourseList;
}) => {
  return (
    <>
      <Navbar courseList={courseList} />
      {children}
    </>
  );
};

export default NavbarLayout;
