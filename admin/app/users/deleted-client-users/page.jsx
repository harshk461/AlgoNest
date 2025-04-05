import Heading from "@/components/Common/Heading";
import Wrapper from "@/components/Wrapper";
import DeletedClientPage from "./DeletedClientPage";
import { getAllDeletedClientUsers } from "@/actions/users/get-deleted-client-users";
import FlexWrapper from "@/components/FlexWrapper";

export default async function Page() {
  const { data, headers } = await getAllDeletedClientUsers();

  return (
   <FlexWrapper>
      <Heading heading={"Deleted Client Users"} />
      <DeletedClientPage initialData={data} headers={headers} />
    </FlexWrapper>
  );
}
