import BizImageList from '@/app/dashboard/_components/BizImage/BizImageList';
import CategoryList from '@/app/dashboard/_components/Category/CategoryList';
import { CreateButton } from '@/components/ui/action-button';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import ImageUploadWithModal from '@/components/ui/multiple-image';
import MultipleImageUpload from '@/components/ui/multiple-image';
import { fetchBizById } from '@/routes/api';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Biz Images | Rating Dashboard',
}

export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`text-2xl`}>Biz Images</h1>
            </div>
            <div className="mt-4 flex items-end justify-end gap-2 md:mt-8">
                <ImageUploadWithModal bizId={id} />
            </div>
            <BizImageList id={id}/>
        </div>
    );
}