'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import {  updateTagAction } from '@/actions/tagAction';
import ValidateError from '@/components/ui/validate-error';
import ErrorPopup from '@/components/ui/error-popup';
import { Tag } from '@/types/tag';

export default function TagEdit(
{
    tag,
}: {
    tag: Tag;
}) {
  const initialState = { errors: {}, message : undefined };
  const updateTagId = updateTagAction.bind(null, tag.id);
  const [state, dispatch] = useFormState(updateTagId, initialState);

  return (
    <form action={dispatch}>
        {state.message && <ErrorPopup message={state.message} />}
        <div className="rounded-md bg-blue-50 p-4 md:p-6">

        {/* Tag name (English) */}
        <div className="mb-4">
          <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
           Tag Name ( English )
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name_en"
                name="name_en"
                type="text"
                defaultValue={tag.name_en}
                placeholder="Enter Tag Name (English)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-en-error"
              />
            </div>
            <ValidateError id='name_en' message={state.errors?.name_en}/>
          </div>
        </div>

        {/* Tag Name (Myanmar) */}
        <div className="mb-4">
          <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
           Tag Name ( Myanmar )
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name_mm"
                name="name_mm"
                type="text"
                defaultValue={tag.name_mm}
                placeholder="Enter Tag Name (Myanmar)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
            </div>
            <ValidateError id='name_mm' message={state.errors?.name_mm}/>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-start gap-4">
        <Button type="submit">Update</Button>
        <Link
          href="/dashboard/tags"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        
      </div>
    </form>
  );
}
