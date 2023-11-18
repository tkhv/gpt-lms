"use client";
import Link from "next/link";
import { useUserContext } from "../context/userContext";
import { useEffect } from "react";

export default function Login() {
  //   const { userId, setUserId, courseList, setCourseList } = useUserContext();
  //   useEffect(() => {
  //     setCourseList(["cs3312", "cs2200", "cs4400"]);
  //   }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Link className="flex bg-gray-600 h-8 w-12" href="/dashboard">
        Login
      </Link>
    </div>
  );
}
