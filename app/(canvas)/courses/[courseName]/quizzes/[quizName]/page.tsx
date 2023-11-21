"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useUserTypeContext } from "@/app/context/userTypeContext";

export default function Quiz({ params }: { params: { quizName: string } }) {
  const pathName = usePathname();
  const { isTA } = useUserTypeContext();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {params.quizName} Quizzes
          </h2>
          <h2 className="text-xl font-bold tracking-tight">Instruction</h2>
        </div>
      </div>
      <div>
        <Button>
          {isTA ? (
            <Link href={`${pathName}/edit`}>edit</Link>
          ) : (
            <Link href={`${pathName}/take`}>take</Link>
          )}
        </Button>
      </div>
    </div>
  );
}
