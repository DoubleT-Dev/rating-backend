'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import ValidateError from '@/components/ui/validate-error';
import RadioBoxComponent from '@/components/ui/radiobox';
import { createRatingCategoryAction } from '@/actions/ratingCategoryAction';
import ErrorPopup from '@/components/ui/error-popup';
import { useState } from 'react';

export default function RatingCategoryCreate() {
  const [previews, setPreviews] = useState<string>("/no-image.png");
  const initialState = { errors: {} };
  const [state, dispatch] = useFormState(createRatingCategoryAction, initialState);
  
  const handleImageChange = (event: any) => {
    const files = event.target.files[0];
    setPreviews(URL.createObjectURL(files));
  };

  return (
    <form action={dispatch} >
      {state.message && <ErrorPopup message={state.message} />}
      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        {/* Icon */}
        <div className="mb-4">
          <label htmlFor="logo" className="mb-2 block text-sm font-medium">
            Slide Image
          </label>
          <div className="relative mt-2 rounded-md">

            <div className="relative">

              <div className="preview-edit">
                <img src={previews} alt="preview" style={{ width: '150px' }} />
              </div>

              <input
                id="icon_link"
                name="icon_link"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="biz-error"
              />
            </div>
            <ValidateError id='icon_link' message={state?.errors?.icon_link} />
          </div>
        </div>

        {/* Category name (English) */}
        <div className="mb-4">
          <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
            Rating Category Name ( English )
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name_en"
                name="name_en"
                type="text"
                placeholder="Enter Rating Category Name (English)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-en-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='name_en' message={state.errors?.name_en} />
          </div>
        </div>

        {/* Category Name (Myanmar) */}
        <div className="mb-4">
          <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
            Rating Category Name ( Myanmar )
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name_mm"
                name="name_mm"
                type="text"
                placeholder="Enter Rating Category Name (Myanmar)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='name_mm' message={state.errors?.name_mm} />
          </div>
        </div>

        <RadioBoxComponent status={true} />

      </div>
      <div className="mt-6 flex justify-start gap-4">
        <Button type="submit">Create</Button>
        <Link
          href="/dashboard/rating-categories"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>

      </div>
    </form>
  );
}
