"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const { sheet } = useParams();
  return <div>{sheet}</div>;
}
