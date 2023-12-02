"use client";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { courseName } = router.query;
  const { data: session } = useSession();
  const username = session?.user.name;
  const imageURL = session?.user.image;
  const courseList = session?.user.courseList || [];

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
        {courseList.map((courseName, index) => (
          <Link
            key={index}
            href={`/${courseName || courseName}`}
            className={`p-4 block ${
              isActive(`${courseName}`)
                ? "bg-sidebarColor"
                : "hover:bg-sidebarColor"
            }`}
          >
            {courseName}
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
