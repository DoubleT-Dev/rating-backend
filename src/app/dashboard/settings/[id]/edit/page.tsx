import React from 'react'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { fetchSettingById } from '@/routes/api';
import SettingEdit from '@/app/dashboard/_components/Setting/SettingEdit';

export default async function page({ params }: { params: { id: string } }) 
{
    const id = params.id;
    const setting = await fetchSettingById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Setting', href: '/dashboard/settings' },
          {
            label: 'Edit Setting',
            href: `/dashboard/settings/${id}/edit`,
            active: true,
          },
        ]}
      />
      <SettingEdit setting={setting} />
    </main>

  )
}
