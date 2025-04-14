import { getAllClientUsers } from "@/actions/users/get-client-users";
import Heading from "@/components/Common/Heading";
import React from "react";
import FlexWrapper from "@/components/FlexWrapper";
import Table from "@/components/TableComponent";

export default async function page() {
  const { data, headers } = await getAllClientUsers({});
  return (
   <FlexWrapper>
      <Heading heading={"Ban Users"} />
      <Table
        data={data}
        headers={headers}
        hiddenFields={["metadata", "password", "updatedAt", "bio"]}
        socials={["linkedin", "github", "instagram", "twitter"]}
        actionButtons={(row) => [BanButton(row), UnBanButton(row)]}
      />
    </FlexWrapper>
  );
}

const BanButton = (row) => {
  return (
    <button className="px-4 py-2 rounded-lg border border-red-500 text-red-500 font-semibold">
      Ban
    </button>
  );
};

const UnBanButton = (row) => {
  return (
    <button className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 font-semibold">
      Unban
    </button>
  );
};
