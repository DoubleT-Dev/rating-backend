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
import { useState } from 'react';
import { createEditorAction } from '@/actions/editorAction';
import { Biz } from '@/types/biz';

export default function EditorCreate({
  bizs
}: {
  bizs : any
}) {
  const [previews, setPreviews] = useState<string>("/no-image.png");
  const initialState = { errors: {}, message: undefined };
  const [state, dispatch] = useFormState(createEditorAction, initialState);

  const handleImageChange = (event: any) => {
    const files = event.target.files[0];
    setPreviews(URL.createObjectURL(files));
  };

  return (
    <form action={dispatch} >
      {state.message && <ErrorPopup message={state.message} />}

      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        <fieldset className="rounded-md bg-blue-50 p-4 md:p-6">
          <legend className="mb-1 text-lg font-semibold">Editor Pick</legend>

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
                  id="slide_image"
                  name="slide_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='slide_image' message={state?.errors?.slide_image} />
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Biz</label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                id="biz_id"
                name="biz_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="biz-error"
              >
                <option value="" disabled>
                  Select a Biz
                </option>
                {bizs?.map((biz : any) => (
                  <option key={biz.id} value={biz.id}>
                    {biz.name_en}
                  </option>
                ))}
              </select>
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <ValidateError id="biz_id" message={state && state.errors?.biz_id} />
          </div>

          {/* Biz name (English) */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter Biz Name (English)"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="biz-error"
                />
              </div>
              <ValidateError id='title' message={state?.errors?.title} />
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
