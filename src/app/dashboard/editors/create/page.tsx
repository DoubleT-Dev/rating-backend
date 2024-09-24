import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchAllBizs } from '@/routes/api'
import EditorCreate from '@/app/dashboard/_components/Editor/EditorCreate';

export default async function BizPage() {
    const data = await fetchAllBizs();

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Bizs', href: '/dashboard/editors' },
            {
                label: 'Create Biz',
                href: '/dashboard/editors/create',
                active: true,
            },
            ]}
        />
        <EditorCreate bizs={data} />
        </main>

    )
}
