import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchAllBizs, fetchEditorById } from '@/routes/api'
import EditorEdit from '@/app/dashboard/_components/Editor/EditorEdit';


export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const [data, bizs] = await Promise.all([
        fetchEditorById(id),
        fetchAllBizs(),
      ]);
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
        <EditorEdit editor={data} bizs={bizs} />
        </main>

    )
}
