import SubmissionBox from "components/Problems/SubmissionBox";
import React from "react";

export default function Submissions() {
  const data = [
    {
      submission_id: "sub_12345",
      problem_id: "prob_001",
      problem_name: "Minimum Cost to Make at Least One Valid Path in a Grid",
      type: "accepted",
      language: "C++",
      created_at: new Date().toISOString(),
      runtime: "25 ms",
      memory: "15.6 MB",
      status: "Accepted",
      submission_link: "/submissions/sub_12345",
      submitted_by: "anwendeng",
    },
    {
      submission_id: "sub_12346",
      problem_id: "prob_002",
      problem_name: "Climbing Stairs",
      type: "accepted",
      language: "Python",
      created_at: new Date().toISOString(),
      runtime: "55 ms",
      memory: "10.4 MB",
      status: "Accepted",
      submission_link: "/submissions/sub_12346",
      submitted_by: "johndoe92",
    },
    {
      submission_id: "sub_12347",
      problem_id: "prob_003",
      problem_name: "Longest Common Subsequence",
      type: "accepted",
      language: "Java",
      created_at: new Date().toISOString(),
      runtime: "120 ms",
      memory: "22.8 MB",
      status: "Accepted",
      submission_link: "/submissions/sub_12347",
      submitted_by: "mary_jones",
    },
    {
      submission_id: "sub_12348",
      problem_id: "prob_004",
      problem_name: "Binary Tree Level Order Traversal",
      type: "accepted",
      language: "C#",
      created_at: new Date().toISOString(),
      runtime: "75 ms",
      memory: "18.2 MB",
      status: "Accepted",
      submission_link: "/submissions/sub_12348",
      submitted_by: "alex_smith",
    },
    {
      submission_id: "sub_12349",
      problem_id: "prob_005",
      problem_name: "Merge Intervals",
      type: "rejected",
      language: "JavaScript",
      created_at: new Date().toISOString(),
      runtime: "35 ms",
      memory: "12.8 MB",
      status: "Rejected",
      submission_link: "/submissions/sub_12349",
      submitted_by: "lucy_brown",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {data.map((item, index) => (
        <SubmissionBox submission={item} key={index} />
      ))}
    </div>
  );
}
