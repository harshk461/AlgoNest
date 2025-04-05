import Heading from '@/components/Common/Heading';
import FlexWrapper from '@/components/FlexWrapper';
import roadmapService from '../actions/RoadmapService';
import AllRoadmapsClient from './AllRoadmapsClient';

export default async function Page() {
  const { data, headers } = await roadmapService.getAllRoadmaps();

  return (
    <FlexWrapper>
      <Heading heading="All Roadmaps" />
      <AllRoadmapsClient data={data} headers={headers} />
    </FlexWrapper>
  );
}
