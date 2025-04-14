import Heading from "@/components/Common/Heading";
import FlexWrapper from "@/components/FlexWrapper";
import Table from "@/components/TableComponent";
import React from "react";
import problemService from "../actions/ProblemsService";

export default async function page() {
  const { data, headers } = await problemService.getAllApprovedProblems({});
  return (
    <FlexWrapper>
      <Heading heading={"Approved Problems"} />
      <Table
        data={data}
        headers={headers}
        socials={[]}
        hiddenFields={[
          "testcases",
          "hints",
          "constraints",
          "slug",
          "descriptions",
        ]}
        actionButtons={(row) => [ApproveProblem(row)]}
      />
    </FlexWrapper>
  );
}

const ApproveProblem = (row) => {
  return (
    <button className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500">
      Approve
    </button>
  );
};
