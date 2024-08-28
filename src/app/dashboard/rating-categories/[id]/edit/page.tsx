import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchRatingCategoryById } from '@/routes/api';
import RatingCategoryEdit from '@/app/dashboard/_components/RatingCategory/RatingCategoryEdit';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const category = await fetchRatingCategoryById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Rating Categories', href: '/dashboard/rating-categories' },
          {
            label: 'Create Rating Category',
            href: `/dashboard/rating-categories`,
            active: true,
          },
        ]}
      />
      <RatingCategoryEdit category={category} />
    </main>

  )
}
