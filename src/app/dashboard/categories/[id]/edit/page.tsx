import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchCategoryById } from '@/routes/api';
import CategoryEdit from '@/app/dashboard/_components/Category/CategoryEdit';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const category = await fetchCategoryById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Edit Category',
            href: `/dashboard/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <CategoryEdit category={category} />
    </main>

  )
}
