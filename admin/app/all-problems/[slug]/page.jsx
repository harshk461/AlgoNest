"use client";

import Loader from "@/components/Loader";
import ProblemName from "@/components/SingleProblem/ProblemName";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3090/problems/get-problem?slug=${slug}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch problem:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProblem();
  }, [slug]);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-wrap p-4 gap-4">
      {data?.problem?.length > 0 ? (
        <ProblemName name={data.problem[0].question} />
      ) : (
        <p>No problem found.</p>
      )}
    </div>
  );
}
