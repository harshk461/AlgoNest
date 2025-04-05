import { getAllRoles } from "@/actions/problems/get-all-roles";
import Heading from "@/components/Common/Heading";
import Table from "@/components/TableComponent";
import Wrapper from "@/components/Wrapper";
import React from "react";
import DeleteButton from "./DeleteButton";
import FlexWrapper from "@/components/FlexWrapper";

export default async function page() {
  const { data, headers } = await getAllRoles();
  return (
   <FlexWrapper>
      <Heading heading={"All Roles"} />
      <Table
        data={data}
        headers={headers}
        actionButtons={(row) => [<DeleteButton key={row.id} row={row} />]}
      />
    </FlexWrapper>
  );
}
