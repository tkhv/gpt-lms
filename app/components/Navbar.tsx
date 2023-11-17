"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

type NavbarProps = {
  classList: string[];
};

const Navbar: FC<NavbarProps> = ({ classList }) => {
  const pathName = usePathname();

  const isActive = (route: string) => {
    return route === pathName || route === "/";
  };
  return (
    <nav className="flex flex-col bg-navbarColor text-white h-screen">
      <div className="p-4 flex flex-col items-center">
        {/* Replace with your user icon */}
        <div className="rounded-full bg-gray-600 h-12 w-12 flex items-center justify-center">
          U
        </div>
        <span className="ml-2">USERNAME</span>
      </div>
      <div className="flex flex-col flex-grow">
        {/* Links */}
        <Link
          href="/dashboard"
          className={`p-4 block ${
            isActive("/dashboard") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          Dashboard
        </Link>
        {classList.map((courseName: string) => (
          <Link
            href={`/courses/${courseName}`}
            className={`p-4 block ${
              isActive(`/courses/${courseName}`)
                ? "bg-gray-700"
                : "hover:bg-gray-700"
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
