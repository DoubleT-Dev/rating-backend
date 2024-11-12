import { DeleteBiz, DetailButton, UpdateButton } from '@/components/ui/action-button';
import Status from '@/components/ui/status';
import { fetchEditorPagination } from '@/routes/api';
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server';

export default async function EditorList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const data = await fetchEditorPagination(currentPage, query);

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
                    Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                    Biz
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                {/* Hide on smaller screens using hidden sm:table-cell */}
                <th scope="col" className="relative py-3 pl-6 pr-3 hidden sm:table-cell">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((editor: any) => (
                <tr
                  key={editor.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {
                      <Image
                          src={editor.slide_image}
                          width={100}
                          height={100}
                          alt={editor.name_en}
                          priority
                      />
                    }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {editor.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {editor.bizs.name_en}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={editor.is_active} />
                  </td>
                  {/* Hide on smaller screens using hidden sm:table-cell */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 hidden sm:table-cell">
                    <div className="flex justify-end gap-3">
                      {/* Update and delete buttons will show on larger screens */}
                      <UpdateButton
                        routeName={`/dashboard/editors/${editor.id}/edit`} className={''}                      />

                      <DetailButton routeName={`/dashboard/editors/${editor.id}/detail`} className={''} />

                      <DeleteBiz id={editor.id} />
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
