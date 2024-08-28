import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { lusitana } from '@/components/ui/fonts';
import { RatingCategoriesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchRatingCategoryPagination } from '@/routes/api';
import { CreateButton } from '@/components/ui/action-button';
import RatingCategoryList from '../_components/RatingCategory/RatingCategoryList';

export const metadata: Metadata = {
  title: 'Rating Categories | Rating Dashboard',
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
    const { data, totalPages} = await fetchRatingCategoryPagination(currentPage, query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Categories</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateButton 
            btnName='Create Rating Category' 
            routeName='/dashboard/rating-categories/create'
        />
      </div>
        <Suspense key={query + currentPage} fallback={<RatingCategoriesTableSkeleton />}>
        <RatingCategoryList 
            ratingCategories={data} 
            totalPages={totalPages} 
            query={query} 
            currentPage={currentPage} 
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}