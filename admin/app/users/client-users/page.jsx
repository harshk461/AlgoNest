import { getAllClientUsers } from "@/actions/users/get-client-users";
import Heading from "@/components/Common/Heading";
import Wrapper from "@/components/Wrapper";
import ClientPage from "./ClientPage";
import FlexWrapper from "@/components/FlexWrapper";

export default async function Page() {
  const { data, headers } = await getAllClientUsers();

  return (
   <FlexWrapper>
      <Heading heading={"Client Users"} />
      <ClientPage initialData={data} headers={headers} />
    </FlexWrapper>
  );
}
