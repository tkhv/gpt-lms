"use client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useCourseContext } from "../context/courseContext";
import { useRouter } from "next/router";

const Sidebar: FC = () => {
  const { currentCourse, setCurrentCourse } = useCourseContext();
  const [tabList, setTableList] = useState([
    "Home",
    "Assignments",
    "Quizzes",
    "Modules",
    "Files",
  ]);
  const router = useRouter();

  const isActive = (it: string) => {
    // If the item is 'Home', check against the base path ('/')
    const paramList = router.asPath.split("/");
    if (it === "Home") {
      return paramList.length === 2;
    }
    // Otherwise, compare against the lowercased item
    return paramList[2] === it.toLocaleLowerCase();
  };
  // useEffect(() => {
  //   // If currentCourse is not set, redirect to the home page
  //   if (!currentCourse) {
  //     router.push("/");
  //   }
  // }, [currentCourse, router]);

  // if (!currentCourse) {
  //   return <div>Loading...</div>;
  // }

  return (
    <nav className="flex flex-col bg-sidebarColor text-white h-screen pl-3 pr-2">
      <div className="flex flex-col flex-grow">
        {/* Links */}
        {currentCourse &&
          tabList.map((it) => (
            <Link
              href={`/${currentCourse}${
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
