import React, { Suspense } from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchBizById, getRatingCount } from '@/routes/api';
// import RatingList from '@/app/dashboard/_components/Rating/RatingList';
import BizCover from '@/app/dashboard/_components/Biz/BizCover';
import BizRatingValue from '@/app/dashboard/_components/Biz/BizRatingValue';
import RatingComment from '@/app/dashboard/_components/Rating/RatingComment';
import { RatingCommentSkeleton } from '@/components/ui/skeletons';

export default async function page({
  params,
  searchParams
}: {
  params: { id: string },
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const id = params.id;
  const data = await fetchBizById(id);
  const rating_data = await getRatingCount(id);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bizs', href: '/dashboard/bizs' },
          {
            label: "Biz's Rating List",
            href: `/dashboard/ratings/${id}/ratings`,
            active: true,
          },
        ]}
      />

      <BizCover biz={data} />
      <BizRatingValue ratingValue={rating_data} />
      <Suspense key={currentPage} fallback={<RatingCommentSkeleton />}>
        <RatingComment biz={data} currentPage={currentPage} />
      </Suspense>

    </main>

  )
}
