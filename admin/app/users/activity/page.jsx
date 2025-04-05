import { getAllClientUsers } from "@/actions/users/get-client-users";
import Heading from "@/components/Common/Heading";
import React from "react";
import ClientTable from "../ClientTable";
import LogsModal from "./LogsModal";
import Wrapper from "@/components/Wrapper";
import FlexWrapper from "@/components/FlexWrapper";

export default async function page() {
  const { data, headers } = await getAllClientUsers({});
  return (
   <FlexWrapper>
      <Heading heading={"User Activity Logs"} />
      <ClientTable
        data={data}
        headers={headers}
        hiddenFields={["metadata", "password", "updatedAt", "bio"]}
        socials={["linkedin", "github", "instagram", "twitter"]}
        actionButtons={(row) => [ViewLogs(row)]}
      />
      {/* <LogsModal /> */}
    </FlexWrapper>
  );
}

const ViewLogs = (row) => {
  return (
    <button className="px-4 py-2 rounded-lg border border-green-500 text-green-500 font-semibold">
      View Logs
    </button>
  );
};
