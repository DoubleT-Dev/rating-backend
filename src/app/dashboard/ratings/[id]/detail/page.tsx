import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchBizById, fetchRatingById } from '@/routes/api';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const data = await fetchRatingById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'User Ratings', href: '/dashboard/ratings' },
          {
            label: 'Rating Detail',
            href: `/dashboard/ratings/${id}/detail`,
            active: true,
          },
        ]}
      />
      {/* <RatingDetail biz={data} /> */}
    </main>

  )
}
