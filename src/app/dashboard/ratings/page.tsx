import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { lusitana } from '@/components/ui/fonts';
import { BizTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchRatingCount } from '@/routes/api';
import { CreateButton } from '@/components/ui/action-button';
// import RatingList from '@/app/dashboard/_components/Rating/RatingList';

export const metadata: Metadata = {
  title: 'Bizs | Rating Dashboard',
};

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchRatingCount(currentPage, query);

  return (
    "Hi"
    // <div className="w-full">
    //   <div className="flex w-full items-center justify-between">
    //     <h1 className={`${lusitana.className} text-2xl`}>User Ratings</h1>
    //   </div>
    //   <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
    //     <Search placeholder="Search Comments..." />
    //     {/* <CreateButton 
    //         btnName='Create Biz' 
    //         routeName='/dashboard/ratings/create'
    //     /> */}
    //   </div>
    //    <Suspense key={query + currentPage} fallback={<BizTableSkeleton />}>
    //     <RatingList query={query} currentPage={currentPage} />
    //   </Suspense>
    //   <div className="mt-5 flex w-full justify-center">
    //     <Pagination totalPages={totalPages} />
    //   </div>
    // </div>
  );
}