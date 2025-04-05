import Heading from '@/components/Common/Heading'
import React from 'react'
import Table from '@/components/TableComponent';
import View from './Buttons/View';
import FlexWrapper from '@/components/FlexWrapper';
import roadmapService from '../actions/RoadmapService';

export default async function page() {
  const {data,headers}=await roadmapService.getAllTopics();
  return (
   <FlexWrapper>
      <Heading heading={"All Topics"}/>
      <Table data={data} headers={headers} hiddenFields={['resources','deletedAt']} actionButtons={(row)=>[<View row={row}/>]}/>
    </FlexWrapper>
  )
}
