import React from 'react'
import CategoryCreate from '@/app/dashboard/_components/Category/CategoryCreate'
import Breadcrumbs from '@/components/ui/breadcrumbs'

export default async function page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Create Category',
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <CategoryCreate />
    </main>

  )
}
