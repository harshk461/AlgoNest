import Heading from "@/components/Common/Heading";
import Table from "@/components/TableComponent";
import React from "react";
import FlexWrapper from "@/components/FlexWrapper";
import adminService from "../actions/AdminService";

export default async function page() {
  const { data, headers } = await adminService.getAllRole();
  return (
   <FlexWrapper>
      <Heading heading={"All Roles"} />
      <Table
        data={data}
        headers={headers}
        actionButtons={(row) => []}
      />
    </FlexWrapper>
  );
}
