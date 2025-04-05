import { getAllApprovalProblems } from "@/actions/problems/get-approval-problems";
import Heading from "@/components/Common/Heading";
import Table from "@/components/TableComponent";
import Wrapper from "@/components/Wrapper";
import React from "react";
import { ApproveProblem, RejectProblem } from "./Buttons";
import FlexWrapper from "@/components/FlexWrapper";

export default async function page() {
  const { data, headers } = await getAllApprovalProblems({});
  return (
   <FlexWrapper>
      <Heading heading={"Approve Problems"} />
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
        actionButtons={(row) => [
          <ApproveProblem key={`${row.id}-approve`} row={row} />,
          <RejectProblem key={`${row.id}-reject`} row={row} />,
        ]}
      />
    </FlexWrapper>
  );
}
