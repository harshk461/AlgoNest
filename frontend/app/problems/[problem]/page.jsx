"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const problem = useParams().problem;
  useEffect(() => {
    router.replace("/problems/" + problem + "/description");
  }, []);

  return (
    <div className="w-full flex p-4 flex-col gap-4">
      <div className="w-full p-[30px] rounded-xl animate-pulse bg-primary"></div>
      <div className="w-full h-[80px] rounded-xl animate-pulse bg-primary"></div>
      <div className="w-full p-[100px] rounded-xl animate-pulse bg-primary"></div>
    </div>
  );
}
