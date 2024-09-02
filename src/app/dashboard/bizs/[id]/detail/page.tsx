import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchBizById } from '@/routes/api';
import BizDetail from '@/app/dashboard/_components/Biz/BizDetail';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const data = await fetchBizById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Bizs', href: '/dashboard/bizs' },
          {
            label: 'Biz Detail',
            href: `/dashboard/bizs/${id}/detail`,
            active: true,
          },
        ]}
      />
      <BizDetail biz={data} />
    </main>

  )
}
