import { DeleteCategory, UpdateButton } from '@/components/ui/action-button';
import { UpdateInvoice } from '@/components/ui/invoices/buttons';
import { fetchCategoryPagination } from '@/routes/api';
import { Category } from '@/types/category';


export default async function CategoryList({
  query,
  currentPage,
  categories,
  totalPages
}: {
  query: string;
  currentPage: number;
  categories : Category[]
  totalPages : number
}) {

    console.log(categories);

  return (
  <div className="mt-6 flow-root">
    {/* Add overflow-x-auto to enable horizontal scrolling */}
    <div className="inline-block min-w-full align-middle overflow-x-auto">
      <div className="rounded-lg bg-blue-50 p-2 md:pt-0">
        <table className="min-w-full text-gray-900">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Category Name (English)
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
              Category Name (Myanmar)
              </th>
              {/* Hide on smaller screens using hidden sm:table-cell */}
              <th scope="col" className="relative py-3 pl-6 pr-3 hidden sm:table-cell">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {categories?.map((category) => (
              <tr
                key={category.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap px-3 py-3">
                  {category.name_en}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {category.name_mm}
                </td>
                {/* Hide on smaller screens using hidden sm:table-cell */}
                <td className="whitespace-nowrap py-3 pl-6 pr-3 hidden sm:table-cell">
                  <div className="flex justify-end gap-3">
                    {/* Update and delete buttons will show on larger screens */}
                    <UpdateButton 
                        routeName={`/dashboard/categories/${category.id}/edit`}
                     />
                    
                    <DeleteCategory id={category.id}/>
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
