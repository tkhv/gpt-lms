"use client";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useUserContext } from "./context/userContext";

export default function Home() {
  // const { userId, setUserId, courseList, setCourseList } = useUserContext();
  //this will be sent to navbar by using useContext

  const router = useRouter();

  useEffect(() => {
    // user is not logged in
    router.push("/login");
  }, [router]);

  return (
    <div className="flex">
      <button>Home</button>
    </div>
  );
}
