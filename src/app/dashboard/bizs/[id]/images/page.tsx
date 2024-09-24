import BizImageList from '@/app/dashboard/_components/BizImage/BizImageList';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import ImageUploadWithModal from '@/components/ui/multiple-image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Biz Images | Rating Dashboard',
}

export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Bizs', href: '/dashboard/bizs' },
                    {
                        label: 'Create Biz Image',
                        href: `/dashboard/bizs/${id}/images`,
                        active: true,
                    },
                ]}
            />
            <div className="mt-4 flex items-end justify-end gap-2 md:mt-8">
                <ImageUploadWithModal bizId={id} />
            </div>
            <BizImageList id={id} />
        </main>


    );
}