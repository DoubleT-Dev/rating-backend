import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { lusitana } from '@/components/ui/fonts';
import { CategoriesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchCategoryPagination, fetchSetting } from '@/routes/api';
import CategoryList from '../_components/Category/CategoryList';
import { CreateButton } from '@/components/ui/action-button';
import SettingList from '../_components/Setting/SettingList';

export const metadata: Metadata = {
  title: 'Categories | Rating Dashboard',
};

export default async function Page() {
    const data = await fetchSetting();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateButton 
            btnName='Create Settings' 
            routeName='/dashboard/settings/create'
        />
      </div>

        <SettingList settings={data} />

      <div className="mt-5 flex w-full justify-center">

      </div>
    </div>
  );
}