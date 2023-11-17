"use client";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function Home() {
  const [classList, setClassList] = useState<string[]>([
    "cs3312",
    "cs2200",
    "cs4400",
  ]);
  return (
    <div className="flex">
      <Navbar classList={classList} />
      <Dashboard />
    </div>
  );
}

const Dashboard = () => {
  return <div>Dashboard</div>;
};
