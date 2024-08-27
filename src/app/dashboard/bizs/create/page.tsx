import React from 'react'
import BizCreate from '@/app/dashboard/_components/Biz/BizCreate'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchAllCategory } from '@/routes/api'
import { Category } from '@/types/category';

export default async function BizPage() {
    const data = await fetchAllCategory();

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Bizs', href: '/dashboard/bizs' },
            {
                label: 'Create Biz',
                href: '/dashboard/bizs/create',
                active: true,
            },
            ]}
        />
        <BizCreate categories={data} />
        </main>

    )
}
