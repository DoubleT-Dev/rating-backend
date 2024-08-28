'use client';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createBizAction } from '@/actions/bizAction';
import { Category } from '@/types/category';
import CheckboxComponent from '@/components/ui/checkbox';
import { stat } from 'fs';
import RadioBoxComponent from '@/components/ui/radiobox';
import ValidateError from '@/components/ui/validate-error';

export default function BizCreate({
    categories
} : {
    categories : Category[] | null
}) {
  const initialState = { errors: {} };
  const [state, dispatch] = useFormState(createBizAction, initialState);

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
                    defaultValue=""
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
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <ValidateError id="categories_id" message={state.errors?.categories_id}/>
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
                placeholder="Enter Biz Name (English)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-en-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='name_en' message={state.errors?.name_en}/>
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
                id="name_mm"
                name="name_mm"
                type="text"
                placeholder="Enter Biz Name (Myanmar)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='name_mm' message={state.errors?.name_mm}/>
          </div>
        </div>

        <RadioBoxComponent status={true}/>

      </div>

      <div className="mt-6 flex justify-start gap-4">
        <Button type="submit">Create</Button>
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
