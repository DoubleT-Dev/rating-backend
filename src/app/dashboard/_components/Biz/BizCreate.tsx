'use client';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createBizAction } from '@/actions/bizAction';
import { Category } from '@/types/category';
import RadioBoxComponent from '@/components/ui/radiobox';
import ValidateError from '@/components/ui/validate-error';
import ErrorPopup from '@/components/ui/error-popup';

export default function BizCreate({
  categories
}: {
  categories: Category[] | null
}) {
  const initialState = { errors: {}, message: undefined };
  const [state, dispatch] = useFormState(createBizAction, initialState);

  return (
    <form action={dispatch} >
      {state.message && <ErrorPopup message={state.message} />}

      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        <fieldset className="rounded-md bg-blue-50 p-4 md:p-6">
          <legend className="mb-1 text-lg font-semibold">Biz Infomation</legend>

          <div className="mb-4">
            <label htmlFor="logo" className="mb-2 block text-sm font-medium">
              Biz Logo
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='logo' message={state?.errors?.logo} />
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Category</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                id="categories_id"
                name="categories_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="biz-error"
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
            <ValidateError id="categories_id" message={state && state.errors?.categories_id} />
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
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='name_en' message={state?.errors?.name_en} />
            </div>
          </div>

          {/* Address */}
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
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='name_mm' message={state?.errors?.name_mm} />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
              Description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea id="description"
                  rows={5}
                  name="description"
                  placeholder="Enter Description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error">
                </textarea>
              </div>
              <ValidateError id='description' message={state?.errors?.description} />
            </div>
          </div>

          <RadioBoxComponent status={true} />
        </fieldset>

        <fieldset className="rounded-md bg-blue-50 p-4 md:p-6">
          <legend className="mb-1 text-lg font-semibold">Biz Address</legend>

          {/* Contact */}
          <div className="mb-4">
            <label htmlFor="contact" className="mb-2 block text-sm font-medium">
              Contact
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="Enter Biz Name (English)"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='contact' message={state?.errors?.contact} />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address_1" className="mb-2 block text-sm font-medium">
              Address
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="address_1"
                  name="address_1"
                  type="text"
                  placeholder="Enter Address 1"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='address_1' message={state?.errors?.address_1} />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address_2" className="mb-2 block text-sm font-medium">
              Address 2
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="address_2"
                  name="address_2"
                  type="text"
                  placeholder="Enter Address 1"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='address_2' message={state?.errors?.address_2} />
            </div>
          </div>

          {/* City */}
          <div className="mb-4">
            <label htmlFor="city" className="mb-2 block text-sm font-medium">
              City
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter Biz City"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='city' message={state?.errors?.city} />
            </div>
          </div>

          {/* Township */}
          <div className="mb-4">
            <label htmlFor="township" className="mb-2 block text-sm font-medium">
              Township
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="township"
                  name="township"
                  type="text"
                  placeholder="Enter Township"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='township' message={state?.errors?.township} />
            </div>
          </div>

          {/* Region */}
          <div className="mb-4">
            <label htmlFor="region" className="mb-2 block text-sm font-medium">
              Region
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="region"
                  name="region"
                  type="text"
                  placeholder="Enter Region"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='region' message={state?.errors?.region} />
            </div>
          </div>

        </fieldset>

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
