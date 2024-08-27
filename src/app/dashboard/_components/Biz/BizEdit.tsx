'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { updateBizAction } from '@/actions/bizAction';
import { Biz } from '@/types/biz'
import { Category } from '@/types/category';
import { DocumentDuplicateIcon } from '@heroicons/react/16/solid';

export default function BizEdit({
    biz,
    categories
  }: {
    biz: Biz;
    categories: Category[] | null;
  }) {
  const initialState = { errors: {} };
  console.log(biz);
  const updateBizID = updateBizAction.bind(null, biz.id);
  const [state, dispatch] = useFormState(updateBizID, initialState);

  return (
    <form action={dispatch} >
      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Category</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    id="categories_id"
                    name="categories_id"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={biz.categories_id}
                    aria-describedby="categories-id-error"
                >
                <option value="" disabled>
                    Select a category
                </option>
                {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name_en}
                    </option>
                ))}
                </select>
                <DocumentDuplicateIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="categories-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.categories_id &&
              state.errors.categories_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
                id="name_en"
                name="name_en"
                type="text"
                defaultValue={biz.name_en}
                placeholder="Enter Biz Name (English)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-en-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <div id="name-en-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name_en &&
                state.errors.name_en.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Category Name (Myanmar) */}
        <div className="mb-4">
          <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
           Category Name ( Myanmar )
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name_mm"
                name="name_mm"
                type="text"
                defaultValue={biz.name_mm}
                placeholder="Enter Category Name (Myanmar)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <div id="name-mm-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name_mm &&
                state.errors.name_mm.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-start gap-4">
        <Button type="submit">Update</Button>
        <Link
          href="/dashboard/categories"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        
      </div>
    </form>
  );
}
