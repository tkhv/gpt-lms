"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useUserTypeContext } from "@/context/userTypeContext";
import { useRouter } from "next/router";

export default function Quiz() {
  const router = useRouter();
  const { quizName } = router.query;

  const pathName = router.asPath;

  const { isTA } = useUserTypeContext();

  const handleButtonClick = () => {
    if (isTA) {
      router.push(`${pathName}/edit`);
    } else {
      router.push(`${pathName}/take`);
    }
  };

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {quizName} Quizzes
          </h2>
          <h2 className="text-xl font-bold tracking-tight">Instruction</h2>
        </div>
      </div>
      <div>
        <Button onClick={handleButtonClick}>
          {isTA ? <span>edit</span> : <span>take</span>}
        </Button>
      </div>
    </div>
  );
}
