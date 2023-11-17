"use client";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  //this will be sent to navbar by using useContext
  const [classList, setClassList] = useState<string[]>([
    "cs3312",
    "cs2200",
    "cs4400",
  ]);

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
