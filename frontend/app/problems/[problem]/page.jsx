"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const problem = useParams().problem;
  useEffect(() => {
    router.replace("/problems/" + problem + "/description");
  }, []);

  return <div>page</div>;
}
