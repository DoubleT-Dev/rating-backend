import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { lusitana } from '@/components/ui/fonts';
import { BizTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchEditorCount } from '@/routes/api';
import { CreateButton } from '@/components/ui/action-button';
import EditorList from '../_components/Editor/EditorList';

export const metadata: Metadata = {
  title: 'Editor Pick | Rating Dashboard',
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
    const totalPages = await fetchEditorCount(currentPage, query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Editor Pick</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Title..." />
        <CreateButton 
            btnName='Create Editor Pick' 
            routeName='/dashboard/editors/create'
        />
      </div>

       <Suspense key={query + currentPage} fallback={<BizTableSkeleton />}>
        <EditorList query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}