import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchAddressById } from '@/routes/api';
import BizAddressEdit from '@/app/dashboard/_components/BizAddress/BizAddressEdit';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    console.log(id);
    const addresses = await fetchAddressById(id);

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
            <BizAddressEdit address={addresses} />
        </main>

    )
}
