import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import TagCreate from '@/app/dashboard/_components/Tag/TagCreate'

export default async function page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tags', href: '/dashboard/tags' },
          {
            label: 'Create Tag',
            href: '/dashboard/tags/create',
            active: true,
          },
        ]}
      />
      <TagCreate />
    </main>

  )
}
