import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import SettingCreate from '../../_components/Setting/SettingCreate'

export default async function page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Setting', href: '/dashboard/settings' },
          {
            label: 'Create Setting',
            href: '/dashboard/settings/create',
            active: true,
          },
        ]}
      />
      <SettingCreate />
    </main>

  )
}
