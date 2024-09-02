import { Biz } from '@/types/biz';
import Link from 'next/link';
import BizAddress from '../BizAddress/BizAddress';
import { CreateButton } from '@/components/ui/action-button';

export default function BizDetail(
    {
        biz,
    }: {
        biz: Biz;
    }) {

    return (
        <>
        <div className="grid grid-cols-2 gap-8">
            <div className="rounded-md bg-blue-50 p-4 md:p-6">

                {/* Category name  */}
                <div className="mb-4">
                    <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
                        Category Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                type="text"
                                defaultValue={biz.categories.name_en}
                                disabled
                                className="w-full px-5 rounded border border-stroke bg-white py-3 text-black"
                            />
                        </div>
                    </div>
                </div>

                {/* Biz name (English) */}
                <div className="mb-4">
                    <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
                        Biz Name ( English )
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                type="text"
                                defaultValue={biz.name_en}
                                disabled
                                className="w-full px-5 rounded border border-stroke bg-white py-3 text-black"
                            />
                        </div>
                    </div>
                </div>

                {/* Biz Name (Myanmar) */}
                <div className="mb-4">
                    <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
                        Biz Name ( Myanmar )
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                type="text"
                                defaultValue={biz.name_mm}
                                disabled
                                className="w-full px-5 rounded border border-stroke bg-white py-3 text-black"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-start gap-4">
                    <Link
                        href={`/dashboard/bizs/${biz.id}/edit`}
                        className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                    >
                        Edit Page
                    </Link>
                </div>

            </div>
        </div>

        <BizAddress addresses={biz.addresses} id={biz.id}/>
</>
    );
}
