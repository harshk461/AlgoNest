import Heading from "@/components/Common/Heading";
import FlexWrapper from "@/components/FlexWrapper";
import Table from "@/components/TableComponent";
import React from "react";
import problemService from "../actions/ProblemsService";

export default async function page() {
  const { data, headers } = await problemService.getAllApprovedProblems({});
  return (
    <FlexWrapper>
      <Heading heading={"Enable/Disable Problems"} />
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
        actionButtons={(row) => [EnableButton(row), DisableButton(row)]}
      />
    </FlexWrapper>
  );
}

const EnableButton = (row) => {
  return (
    <button className="px-4 py-2 rounded-lg text-green-500 border border-green-500">
      Enable
    </button>
  );
};

const DisableButton = (row) => {
  return (
    <button className="px-4 py-2 rounded-lg text-red-500 border border-red-500">
      Disable
    </button>
  );
};
