import Heading from "@/components/Common/Heading";
import Table from "@/components/TableComponent";
import React from "react";
import FlexWrapper from "@/components/FlexWrapper";
import userService from "../actions/UserService";
import Link from "next/link";
import { actionButtons } from "./buttons";

export default async function Page() {
  const { data, headers } = await userService.getAllAdminUsers();

  return (
    <FlexWrapper>
      <div className="w-full flex justify-between items-center py-4">
        <Link
          href={"/users/dashboard-users/add-user"}
          className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 font-semibold"
        >
          Add User
        </Link>
        <Heading heading={"All Users"} />
      </div>
      <div className="w-full overflow-auto">
        <Table
          headers={headers}
          data={data}
          hiddenFields={[
            "createdAt",
            "isEmailVerified",
            "isActive",
            "updatedAt",
            "deletedAt",
            "password",
          ]}
          actionButtons={actionButtons}
        />
      </div>
    </FlexWrapper>
  );
}
