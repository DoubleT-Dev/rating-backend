import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchTagById } from '@/routes/api';
import TagEdit from '@/app/dashboard/_components/Tag/TagEdit';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const tag = await fetchTagById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/tags' },
          {
            label: 'Edit Category',
            href: `/dashboard/tags/${id}/edit`,
            active: true,
          },
        ]}
      />
      <TagEdit tag={tag} />
    </main>

  )
}
