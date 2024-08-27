import { DeleteBiz, UpdateButton } from '@/components/ui/action-button';
import { fetchBizPagination } from '@/routes/api';

export default async function CategoryList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const data = await fetchBizPagination(currentPage, query);

  return (
  <div className="mt-6 flow-root">
    {/* Add overflow-x-auto to enable horizontal scrolling */}
    <div className="inline-block min-w-full align-middle overflow-x-auto">
      <div className="rounded-lg bg-blue-50 p-2 md:pt-0">
        <table className="min-w-full text-gray-900">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Category Name
              </th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Biz Name (English)
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
              Biz Name (Myanmar)
              </th>
              {/* Hide on smaller screens using hidden sm:table-cell */}
              <th scope="col" className="relative py-3 pl-6 pr-3 hidden sm:table-cell">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((biz : any) => (

              <tr
                key={biz.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap px-3 py-3">
                  {biz.categories.name_en}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {biz.name_en}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {biz.name_mm}
                </td>
                {/* Hide on smaller screens using hidden sm:table-cell */}
                <td className="whitespace-nowrap py-3 pl-6 pr-3 hidden sm:table-cell">
                  <div className="flex justify-end gap-3">
                    {/* Update and delete buttons will show on larger screens */}
                    <UpdateButton 
                        routeName={`/dashboard/bizs/${biz.id}/edit`}
                     />
                    
                    <DeleteBiz id={biz.id}/>
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
