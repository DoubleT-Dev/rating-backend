'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import ValidateError from '@/components/ui/validate-error';
import RadioBoxComponent from '@/components/ui/radiobox';
import ErrorPopup from '@/components/ui/error-popup';
import { createSettingAction } from '@/actions/settingAction';

export default function SettingCreate() {
  const initialState = { errors: {} };
  const [state, dispatch] = useFormState(createSettingAction, initialState);

  return (
    <form action={dispatch} >
      {state.message && <ErrorPopup message={state.message} />}
      
      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        {/* Setting Key */}
        <div className="mb-4">
          <label htmlFor="key" className="mb-2 block text-sm font-medium">
           Key
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="key"
                name="key"
                type="text"
                placeholder="Enter Setting Key"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-en-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='key' message={state.errors?.key}/>
          </div>
        </div>

        {/* Setting Value */}
        <div className="mb-4">
          <label htmlFor="value" className="mb-2 block text-sm font-medium">
           Value
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="value"
                name="value"
                type="text"
                placeholder="Enter Setting Value"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='value' message={state.errors?.value}/>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-start gap-4">
        <Button type="submit">Create</Button>
        <Link
          href="/dashboard/settings"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        
      </div>
    </form>
  );
}
