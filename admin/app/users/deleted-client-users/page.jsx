import Heading from "@/components/Common/Heading";
import FlexWrapper from "@/components/FlexWrapper";
import Table from "@/components/TableComponent";
import userService from "../actions/UserService";

export default async function Page() {
  const { data, headers } = await userService.getAllDeletedClientUser();

  return (
   <FlexWrapper>
      <Heading heading={"Deleted Client Users"} />
      <Table data={data} headers={headers}/>
    </FlexWrapper>
  );
}
