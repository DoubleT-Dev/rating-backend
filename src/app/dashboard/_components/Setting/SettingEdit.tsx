'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { updateCategoryAction } from '@/actions/categoryAction';
import ValidateError from '@/components/ui/validate-error';
import RadioBoxComponent from '@/components/ui/radiobox';
import ErrorPopup from '@/components/ui/error-popup';
import { Setting } from '@/types/setting';
import { updateSettingAction } from '@/actions/settingAction';

export default function SettingEdit({
  setting,
}: {
  setting: Setting;
}) {
  const initialState = { errors: {} };
  const updateSettingID = updateSettingAction.bind(null, setting.id);
  const [state, dispatch] = useFormState(updateSettingID, initialState);

  return (
    <form action={dispatch} >
      {state.message && <ErrorPopup message={state.message} />}

      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        {/* Category name (English) */}
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
                defaultValue={setting.key}
                placeholder="Enter Category Name (English)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-en-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='key' message={state.errors?.key} />
          </div>
        </div>

        {/* Category Name (Myanmar) */}
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
                defaultValue={setting.value}
                placeholder="Enter Category Name (Myanmar)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <ValidateError id='value' message={state.errors?.value} />
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
