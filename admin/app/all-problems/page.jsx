"use client";
import Input from "@/common/Input";
import MultiSelect from "@/components/Common/MultipleSelect";
import Table from "@/components/TableComponent";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const navigate = useRouter();
  const [headers, setHeaders] = useState([]);

  const [data, setData] = useState([]);

  const [problem, setProlem] = useState("");
  const [difficulty, setDifficulty] = useState([]);
  const [topics, setTopics] = useState([]);

  const topicOptions = [
    { value: "arrays", label: "Arrays" },
    { value: "linked_lists", label: "Linked Lists" },
    { value: "stacks", label: "Stacks" },
    { value: "queues", label: "Queues" },
    { value: "hashing", label: "Hashing" },
    { value: "recursion", label: "Recursion" },
    { value: "trees", label: "Trees" },
    { value: "graphs", label: "Graphs" },
    { value: "dynamic_programming", label: "Dynamic Programming" },
    { value: "greedy", label: "Greedy Algorithms" },
    { value: "backtracking", label: "Backtracking" },
    { value: "bit_manipulation", label: "Bit Manipulation" },
    { value: "tries", label: "Tries" },
    { value: "segment_trees", label: "Segment Trees" },
    { value: "disjoint_set", label: "Disjoint Set" },
    { value: "binary_search", label: "Binary Search" },
    { value: "sliding_window", label: "Sliding Window" },
    { value: "two_pointers", label: "Two Pointers" },
    { value: "math", label: "Maths" },
  ];
  const diffs = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3090/problems/all-problems",
          {
            params: {
              problem: problem || "",
              difficulty: difficulty.length > 0 ? difficulty : "",
              topics: topics.length > 0 ? topics : "",
            },
            paramsSerializer: (params) => {
              return new URLSearchParams(params).toString();
            },
          }
        );

        if (response.data.length == 0) {
          setHeaders([]);
          setData([]);
        }

        if (response.data.length > 0) {
          console.log(response.data);
          const extractedHeaders = Object.keys(response.data[0]).map((key) => ({
            key,
            label: key.toUpperCase(),
          }));

          setHeaders(extractedHeaders);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchData();
  }, [problem, difficulty, topics]);

  const onView = (data) => {
    navigate.push("/all-problems/" + data.slug);
  };

  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full flex justify-between">
        <Input
          label={"Problem"}
          id={"problem"}
          value={problem}
          setValue={setProlem}
          placeholder={"Enter Problem Name"}
        />
        <div className="flex flex-col gap-2">
          <h1 className="max-w-full w-[300px] text-sm font-semibold">
            Difficulty
          </h1>
          <MultiSelect
            options={diffs}
            className={"bg-secondary rounded-lg text-primary"}
            placeholder="Select Difficulty"
            onChange={setDifficulty}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="max-w-full w-[300px] text-sm font-semibold">Topics</h1>
          <MultiSelect
            options={topicOptions}
            className={"bg-secondary rounded-lg text-primary"}
            placeholder="Select Topics"
            onChange={setTopics}
          />
        </div>
      </div>
      <div className="w-full py-4">
        <Table
          headers={headers}
          data={data}
          hiddenFields={[
            "testcases",
            "hints",
            "constraints",
            "slug",
            "descriptions",
          ]}
          onView={onView}
        />
      </div>
    </div>
  );
}
