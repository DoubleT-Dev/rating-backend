
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createBizAddressAction } from '@/actions/bizAction';
import ValidateError from '@/components/ui/validate-error';
import ErrorPopup from '@/components/ui/error-popup';

export default function BizAddressCreate({ biz }: any) 
{
    const initialState = { errors: {}, message: undefined };
    const [state, dispatch] = useFormState(createBizAddressAction, initialState);

    return (
        <form action={dispatch} >
            {state.message && <ErrorPopup message={state.message} />}

            <div className="rounded-md bg-blue-50 p-4 md:p-6">

                <fieldset className="rounded-md bg-blue-50 p-4 md:p-6">
                    <legend className="mb-1 text-lg font-semibold">Biz Address</legend>

                    <input type="hidden" name='biz_id' defaultValue={biz.id} />

                    {/* Biz name  */}
                    <div className="mb-4">
                        <label htmlFor="name_en" className="mb-2 block text-sm font-medium">
                            Biz Name
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    defaultValue={biz.name_en}
                                    disabled
                                    className="w-full px-5 rounded border border-stroke bg-white py-3 text-black"
                                />
                            </div>
                        </div>
                    </div>

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

                    {/* Address Line 2*/}
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
                    href={`/dashboard/bizs/${biz.id}/detail`}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>

            </div>
        </form>
    );
}
