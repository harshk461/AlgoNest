import { getAllClientUsers } from "@/actions/users/get-client-users";
import Heading from "@/components/Common/Heading";
import FlexWrapper from "@/components/FlexWrapper";
import userService from "../actions/UserService";
import Table from "@/components/TableComponent";

export default async function Page() {
  const { data, headers } = await userService.getAllClientUser();

  return (
   <FlexWrapper>
      <Heading heading={"Client Users"} />
      <Table data={data} headers={headers}/>
    </FlexWrapper>
  );
}
