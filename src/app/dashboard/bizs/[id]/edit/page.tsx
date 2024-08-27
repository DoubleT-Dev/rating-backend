import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchAllCategory, fetchBizById } from '@/routes/api';
import BizEdit from '@/app/dashboard/_components/Biz/BizEdit';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const [data, categories] = await Promise.all([
        fetchBizById(id),
        fetchAllCategory(),
      ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bizs', href: '/dashboard/bizs' },
          {
            label: 'Edit Biz',
            href: `/dashboard/bizs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <BizEdit biz={data} categories={categories} />
    </main>

  )
}
