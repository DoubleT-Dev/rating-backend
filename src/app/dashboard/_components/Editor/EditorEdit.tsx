'use client';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import RadioBoxComponent from '@/components/ui/radiobox';
import ValidateError from '@/components/ui/validate-error';
import ErrorPopup from '@/components/ui/error-popup';
import { useState } from 'react';
import { createEditorAction, updateEditorAction } from '@/actions/editorAction';
import { createClient } from '@/utils/supabase/client';

const getImageUrl = (filename: string) => {
    const supabase = createClient()
    const { data } = supabase.storage.from('rating-bucket').getPublicUrl(filename)

    return data.publicUrl;
};

export default function EditorEdit({
    editor,
    bizs
}: {
    editor: any
    bizs: any
}) {

    const initialState = { errors: {}, message: undefined };
    const [previews, setPreviews] = useState<string>(editor.slide_image); // Initialize with old image
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // State to store selected image file

    const updateEditorID = updateEditorAction.bind(null, editor.id);
    const [state, dispatch] = useFormState(updateEditorID, initialState);
    const [textareaValue, setTextareaValue] = useState(editor.description); // State to store textarea value

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
            formData.append('slide_image', selectedImage);
        } else {
            formData.append('slide_image', editor.slide_image);
        }

        formData.append('biz_id', event.target.biz_id.value);
        formData.append('title', event.target.title.value);
        formData.append('description', textareaValue);
        formData.append('is_active', event.target.is_active.value);

        dispatch(formData);
    };

    return (
        <form onSubmit={handleSubmit} >
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
                                defaultValue={editor.biz_id}
                                aria-describedby="biz-error"
                            >
                                <option value="" disabled>
                                    Select a Biz
                                </option>
                                {bizs?.map((biz: any) => (
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
                                    defaultValue={editor.title}
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
                                    defaultValue={textareaValue}
                                    onChange={handleInputChange}
                                    placeholder="Enter Description"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="biz-error">
                                </textarea>
                            </div>
                            <ValidateError id='description' message={state?.errors?.description} />
                        </div>
                    </div>

                    <RadioBoxComponent status={editor.is_active} />
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
