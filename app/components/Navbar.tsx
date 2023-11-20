"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FC, useContext } from "react";
import { useCourseContext } from "../context/courseContext";
import { Course, CourseList } from "@/lib/types";

import { UserNav } from "./user-nav";

type NavbarProps = {
  courseList: CourseList;
};

const Navbar: FC<NavbarProps> = ({ courseList }) => {
  const { currentCourse, setCurrentCourse } = useCourseContext();

  const pathName = usePathname();

  const isActive = (route: string) => {
    const pathList = pathName.split("/");
    /*pathList = ["", dashboard] or ["", courses, [courseName], ...]*/
    return pathList.length > 2 ? route === pathList[2] : route === pathList[1];
  };
  return (
    <nav className="flex flex-col bg-navbarColor text-white h-screen">
      <div className="p-4 mb-2 mt-4 flex flex-col items-center">
        {/* Replace with logged in username */}
        <UserNav username={"USERNAME"} />
      </div>
      <div className="flex flex-col flex-grow">
        {/* Links */}
        <Link
          href="/dashboard"
          className={`p-4 block ${
            isActive("dashboard") ? "bg-sidebarColor" : "hover:bg-sidebarColor"
          }`}
          onClick={() => setCurrentCourse("")}
        >
          Dashboard
        </Link>
        {courseList.map((course: Course) => (
          <Link
            key={course.id}
            href={`/courses/${course.name}`}
            className={`p-4 block ${
              isActive(`${course.name}`)
                ? "bg-sidebarColor"
                : "hover:bg-sidebarColor"
            }`}
            onClick={() => setCurrentCourse(course.name)}
          >
            {course.name}
          </Link>
        ))}
      </div>
      <div className="p-4">
        {/* Exit or logout link */}
        <Link href="/logout" className="hover:bg-gray-700 p-2 rounded-full">
          {/* Replace with an appropriate icon */}
          Exit
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
