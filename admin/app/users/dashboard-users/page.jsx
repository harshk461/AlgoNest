import Heading from "@/components/Common/Heading";
import Table from "@/components/TableComponent";
import Wrapper from "@/components/Wrapper";

import React from "react";
import { AddUser, DeleteButton, ViewButton } from "./Buttons";
import { getAllDashboardUsers } from "@/actions/users/get-dashboard-users";
import FlexWrapper from "@/components/FlexWrapper";

export default async function Page() {
  const { data, headers } = await getAllDashboardUsers();
  return (
   <FlexWrapper>
      <div className="w-full flex justify-between items-center py-4">
        <AddUser />
        <Heading heading={"All Users"} />
      </div>
      <div className="w-full overflow-auto">
        <Table
          headers={headers}
          data={data}
          actionButtons={(row) => [
            <ViewButton key="view" data={row} />,
            <DeleteButton key="delete" data={row} />,
          ]}
        />
      </div>
    </FlexWrapper>
  );
}
