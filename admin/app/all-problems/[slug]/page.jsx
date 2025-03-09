"use client";

import { updateProblem } from "@/actions/update-problem";
import Loader from "@/components/Loader";
import Descriptions from "@/components/SingleProblem/Descriptions";
import Difficulty from "@/components/SingleProblem/Difficulty";
import ProblemName from "@/components/SingleProblem/ProblemName";
import Slug from "@/components/SingleProblem/Slug";
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
        <div className="w-full grid grid-cols-2 gap-4">
          <ProblemName
            name={data.problem[0].question}
            className="h-full"
            onClick={(updatedName) =>
              updateProblem({
                body: { id: data.problem[0].id, question: updatedName },
                setLoading,
              })
            }
          />

          <Descriptions
            description={data.problem[0].descriptions}
            className="h-full"
            onClick={(desc) =>
              updateProblem({
                body: { id: data.problem[0].id, descriptions: desc },
                setLoading,
              })
            }
          />
          <Difficulty
            difficulty={data.problem[0].difficulty}
            onClick={(diff) =>
              updateProblem({
                body: { id: data.problem[0].id, difficulty: diff },
                setLoading,
              })
            }
          />
          <Slug
            slug={data.problem[0].slug}
            onClick={(slug) =>
              updateProblem({
                body: { id: data.problem[0].id, slug: slug },
                setLoading,
                newSlug: slug,
              })
            }
          />
        </div>
      ) : (
        <p>No problem found.</p>
      )}
    </div>
  );
}
