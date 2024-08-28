'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { Category } from '@/types/category'
import ValidateError from '@/components/ui/validate-error';
import RadioBoxComponent from '@/components/ui/radiobox';
import { updateRatingCategoryAction } from '@/actions/ratingCategoryAction';
import { RatingCategory } from '@/types/rating-category';

export default function CategoryEdit({
    category,
  }: {
    category: RatingCategory;
  }) {
  const initialState = { errors: {} };
  const updateCategoryID = updateRatingCategoryAction.bind(null, category.id);
  const [state, dispatch] = useFormState(updateCategoryID, initialState);

  return (
    <form action={dispatch} >
      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        {/* Category name (English) */}
        <div className="mb-4">
          <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
           Category Name ( English )
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name_en"
                name="name_en"
                type="text"
                defaultValue={category.name_en}
                placeholder="Enter Category Name (English)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-en-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='name_en' message={state.errors?.name_en}/>
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
                defaultValue={category.name_mm}
                placeholder="Enter Category Name (Myanmar)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='name_mm' message={state.errors?.name_mm}/>
          </div>
        </div>

        <RadioBoxComponent status={category.is_active}/>

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
