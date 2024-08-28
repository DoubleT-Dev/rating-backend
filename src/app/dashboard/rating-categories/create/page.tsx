import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import RatingCategoryCreate from '@/app/dashboard/_components/RatingCategory/RatingCategoryCreate';

export default async function page() 
{
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
      <RatingCategoryCreate />
    </main>

  )
}
