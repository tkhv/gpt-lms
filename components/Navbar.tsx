"use client";
import Link from "next/link";
import { FC } from "react";
import { Course, CourseList, User } from "@/lib/types";

import { UserNav } from "./user-nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type NavbarProps = {
  courseList: CourseList;
  // user: User;
};

const Navbar: FC<NavbarProps> = ({ courseList }) => {
  const { data: session } = useSession();
  const username = session?.user.name;
  const imageURL = session?.user.image;
  const router = useRouter();
  const { courseName } = router.query;

  const pathName = useRouter();

  const isActive = (route: string) => {
    const pathList = pathName.asPath.split("/");
    /*pathList = ["", dashboard] or ["", courses, [courseName], ...]*/
    return route === pathList[1];
  };
  return (
    <nav className="flex flex-col bg-navbarColor text-white h-screen">
      <div className="p-4 mb-2 mt-4 flex flex-col items-center">
        <UserNav username={username || ""} imageURL={imageURL || ""} />
      </div>
      <div className="flex flex-col flex-grow">
        {/* Links */}
        <Link
          href="/dashboard"
          className={`p-4 block ${
            isActive("dashboard") ? "bg-sidebarColor" : "hover:bg-sidebarColor"
          }`}
        >
          Dashboard
        </Link>
        {courseList.map((course: Course) => (
          <Link
            key={course.id}
            href={`/${course.name || courseName}`}
            className={`p-4 block ${
              isActive(`${course.name}`)
                ? "bg-sidebarColor"
                : "hover:bg-sidebarColor"
            }`}
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
