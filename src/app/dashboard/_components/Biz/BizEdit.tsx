'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { updateBizAction } from '@/actions/bizAction';
import { Biz } from '@/types/biz'
import { Category } from '@/types/category';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import RadioBoxComponent from '@/components/ui/radiobox';
import ValidateError from '@/components/ui/validate-error';
import { useState } from 'react';
import ErrorPopup from '@/components/ui/error-popup';

export default function BizEdit({
  biz,
  categories
}: {
  biz: Biz;
  categories: Category[] | null;
}) {
  const initialState = { errors: {} };
  const [previews, setPreviews] = useState<string>(biz.logo);

  const updateBizID = updateBizAction.bind(null, biz.id);
  const [state, dispatch] = useFormState(updateBizID, initialState);
  const [textareaValue, setTextareaValue] = useState(biz.description);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  // Handle textarea input change
  const handleInputChange = (event: any) => {
    setTextareaValue(event.target.value); // Update state with the new value
  };

  // Handle image input change
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the selected image file
      setPreviews(URL.createObjectURL(file)); // Update the preview with the new image
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();

    if (selectedImage) {
      formData.append('logo', selectedImage);
    } else {
      formData.append('logo', biz.logo);
    }

    formData.append('name_en', event.target.name_en.value);
    formData.append('name_mm', event.target.name_mm.value);
    formData.append('categories_id', event.target.categories_id.value);
    formData.append('description', textareaValue);
    formData.append('is_active', event.target.is_active.value);

    dispatch(formData);
  };

  return (
    <form onSubmit={handleSubmit} >
      {state.message && <ErrorPopup message={state.message} />}

      <div className="rounded-md bg-blue-50 p-4 md:p-6">

        <div className="mb-4">
          <label htmlFor="logo" className="mb-2 block text-sm font-medium">
            Biz Logo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">

              <div className="preview-edit">
                <img src={previews} alt="preview" style={{ width: '150px' }} />
              </div>

              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <ValidateError id='categories_id' message={state.errors?.categories_id} />
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
            </div>
            <ValidateError id='name_en' message={state.errors?.name_en} />
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
                defaultValue={biz.name_mm}
                placeholder="Enter Category Name (Myanmar)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-mm-error"
              />
            </div>
            <ValidateError id='name_mm' message={state.errors?.name_mm} />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="name_en" className="mb-2 block text-sm font-medium">Description</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea id="description"
                rows={5}
                name="description"
                value={textareaValue}
                onChange={handleInputChange}
                placeholder="Enter Description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="biz-error" />

            </div>
            <ValidateError id='description' message={state.errors?.description} />
          </div>
        </div>

        <RadioBoxComponent status={biz.is_active} />

      </div>
      <div className="mt-6 flex justify-start gap-4">
        <Button type="submit">Update</Button>
        <Link
          href="/dashboard/bizs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>

      </div>
    </form>
  );
}
