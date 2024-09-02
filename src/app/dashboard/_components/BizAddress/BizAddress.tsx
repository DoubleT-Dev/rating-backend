import { CreateButton, DeleteAddress, DeleteBiz, UpdateButton } from '@/components/ui/action-button';

export default function BizAddress({ addresses , id}: any) {

  return (
    <div className="mt-6 flow-root">
        <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
          <h3 className="mb-1 text-lg font-semibold">Biz Address Infomation</h3>
          <CreateButton 
              btnName='Create Biz Address' 
              routeName={`/dashboard/addresses/${id}/create`}
          />
        </div>
      {/* Add overflow-x-auto to enable horizontal scrolling */}
      <div className="inline-block min-w-full align-middle overflow-x-auto">
        <div className="rounded-lg bg-blue-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  #
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contact
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address Line 1
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address Line 2
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  City
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Township
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Region
                </th>
                {/* Hide on smaller screens using hidden sm:table-cell */}
                <th scope="col" className="relative py-3 pl-6 pr-3 hidden sm:table-cell">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {addresses.map((address: any) => (
                <tr
                  key={address.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                    <td className="whitespace-normal break-words px-3 py-3">
                    {address.id}
                    </td>
                    <td className="whitespace-normal break-words px-3 py-3">
                    {address.contact}
                    </td>
                    <td className="whitespace-normal break-words px-3 py-3">
                    {address.address_1}
                    </td>
                    <td className="whitespace-normal break-words px-3 py-3">
                    {address.address_2 ?? '-'}
                    </td>
                    <td className="whitespace-normal break-words px-3 py-3">
                    {address.city ?? '-'}
                    </td>
                    <td className="whitespace-normal break-words px-3 py-3">
                    {address.township ?? '-'}
                    </td>
                    <td className="whitespace-normal break-words px-3 py-3">
                    {address.region ?? '-'}
                    </td>
                    {/* Hide on smaller screens using hidden sm:table-cell */}
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 hidden sm:table-cell">
                    <div className="flex justify-end gap-3">
                        {/* Update and delete buttons will show on larger screens */}
                        <UpdateButton routeName={`/dashboard/addresses/${address.id}/edit`} />
                        <DeleteAddress id={address.id} />
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
