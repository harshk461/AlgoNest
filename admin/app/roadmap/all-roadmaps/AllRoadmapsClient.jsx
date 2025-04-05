'use client';
import React from 'react';
import Table from '@/components/TableComponent';
import ViewButton from '../buttons/ViewButton';
import { useRouter } from 'next/navigation';

export default function AllRoadmapsClient({ data, headers }) {
  const router = useRouter();

  const handleView = (id) => {
    router.push(`/roadmap/all-roadmaps/${id}`);
  };

  return (
    <Table
      data={data}
      headers={headers}
      hiddenFields={['topics', 'deletedAt', 'updatedAt']}
      actionButtons={(row) => [
        <ViewButton key={row.id} row={row} handleClick={() => handleView(row.id)} />,
      ]}
    />
  );
}
