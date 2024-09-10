import { DeleteBizImage } from '@/components/ui/action-button';
import { fetchBizImages } from '@/routes/api';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

export default async function BizImageList(id: any) {
    const data = await fetchBizImages(id.id);

    const getImageUrl = (filename: string) => {
        const supabase = createClient()
        const { data } = supabase.storage.from('rating-bucket').getPublicUrl(filename)

        return data.publicUrl;
    };

    return (
        <div className="mt-6 flow-root">
            {/* Add overflow-x-auto to enable horizontal scrolling */}
            <div className="inline-block min-w-full align-middle overflow-x-auto">
                <div className="rounded-lg bg-blue-50 p-2 md:pt-0">
                    <table className="min-w-full text-gray-900">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Image
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Image ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Biz Name (English)
                                </th>
                                {/* Hide on smaller screens using hidden sm:table-cell */}
                                <th scope="col" className="relative py-3 pl-6 pr-3 hidden sm:table-cell">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.biz_images?.map((biz_images: any) => (

                                <tr
                                    key={biz_images.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <Image
                                            src={getImageUrl(biz_images.image_path)}
                                            width={100}
                                            height={100}
                                            priority
                                            alt={biz_images.image_id}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {biz_images.image_id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {data.name_en}
                                    </td>
                                    {/* Hide on smaller screens using hidden sm:table-cell */}
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3 hidden sm:table-cell">
                                        <div className="flex justify-end gap-3">
                                            {/* Update and delete buttons will show on larger screens */}
                                            <DeleteBizImage id={biz_images.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
