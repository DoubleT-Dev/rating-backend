'use client';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-hot-toast';
import { PlusCircleIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { fetchBizImages, insertBizImage, uploadImage } from '@/routes/api';

// Modal Component
const Modal = ({ isOpen, onClose, onUpload } :any) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {onUpload}
            </div>
        </div>
    );
};

const ImageUploadWithModal = (biz :any) => {

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(files);
        setPreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const handleUpload = async () => {
        if (images.length === 0) {
            toast.error('Please select images to upload.');
            return;
        }

        const supabase = createClient();

        try {

            const uploadPromises = images.map(async (image) => {

                const { data, error } = await supabase.storage
                    .from('rating-bucket')
                    .upload(`images/${Date.now()}_${image.name}`, image);

                if (error) {
                    throw error;
                }

                const bizImageData = {
                    'biz_id' : biz.bizId,
                    'image_id' : data.id,
                    'image_path' : data.path,
                    'full_path' : data.fullPath,
                }

                await insertBizImage(bizImageData);

                return data;
            });

            const uploadedFiles = await Promise.all(uploadPromises);
            toast.success('Images uploaded successfully!');
            console.log('Uploaded Files:', uploadedFiles);

            // Clear images and previews after upload
            setImages([]);
            setPreviews([]);
            setIsModalOpen(false); // Close the modal after successful upload
            window.location.reload()
        } catch (error) {
            toast.error('Failed to upload images.');
            console.error(error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                <span className="hidden md:block">Create</span>{' '}
                <PlusIcon className="h-5 md:ml-4" />
            </button>

            <Modal
                isOpen={isModalOpen}
                // onClose={closeModal}
                onUpload={
                    <>
                        <div className="dropzone items-center">
                            <input
                                id="file-input"
                                className="file-input"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="file-input" className="upload-label">
                                <PlusCircleIcon className="plus-icon" />
                            </label>
                        </div>
                        <div className="preview-container">
                            {previews.map((preview, index) => (
                                <div key={index} className="preview">
                                    <img src={preview} alt="preview" />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="remove-button"
                                    >
                                        <XMarkIcon className="remove-icon" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleUpload} className="upload-button">
                            Upload Images
                        </button>
                        <button className="close-button" onClick={closeModal}>
                            Close
                        </button>
                    </>
                }
            />
        </>
    );
};

export default ImageUploadWithModal;
