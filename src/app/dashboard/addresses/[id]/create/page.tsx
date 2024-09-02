import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchBizById } from '@/routes/api';
import BizAddressCreate from '../../../_components/BizAddress/BizAddressCreate';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const biz = await fetchBizById(id);

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Bizs Detail', href: `/dashboard/bizs/${id}/detail` },
            {
                label: 'Create Biz Address',
                href: `/dashboard/addresses/create`,
                active: true,
            },
            ]}
        />
        <BizAddressCreate biz={biz} />
        </main>

    )
}