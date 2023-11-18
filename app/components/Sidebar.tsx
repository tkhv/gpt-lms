"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useCourseContext } from "../context/coureContext";

const Sidebar: FC = () => {
  const { currentCourse, setCurrentCourse } = useCourseContext();
  const [tabList, setTableList] = useState([
    "Home",
    "Assignments",
    "Quizzes",
    "Modules",
    "Files",
  ]);
  const originPath = `/courses/${currentCourse}`;
  const pathName = usePathname();

  const isActive = (it: string) => {
    // If the item is 'Home', check against the base path ('/')
    if (it === "Home") {
      return pathName === `${originPath}`;
    }
    // Otherwise, compare against the lowercased item
    return pathName === `${originPath}/${it.toLocaleLowerCase()}`;
  };

  return (
    <nav className="flex flex-col bg-sidebarColor text-white h-screen pl-3 pr-2">
      <div className="flex flex-col flex-grow">
        {/* Links */}
        {tabList.map((it) => (
          <Link
            href={`${originPath}${
              it !== "Home" ? `/${it.toLocaleLowerCase()}` : ""
            }`}
            className={`p-4 block group border-l-4  ${
              isActive(it) ? "border-l-4 border-white" : "border-sidebarColor"
            }`}
            key={it}
          >
            <span
              className={`border-b-2 border-white group-hover:border-transparent ${
                isActive(it) ? "border-b-transparent" : ""
              }`}
            >
              {it}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
