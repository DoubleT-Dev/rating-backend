'use client';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-hot-toast';
import { PencilIcon, PlusCircleIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { fetchBizImageId, fetchBizImages, insertBizImage, updateBizImage } from '@/routes/api';
import { uploadImage } from '@/app/lib/utils';

const getImageUrl = (filename: string) => {
    const supabase = createClient()
    const { data } = supabase.storage.from('rating-bucket').getPublicUrl(filename)

    return data.publicUrl;
};

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

const BizImageEdit = ( {bizImage}: any) => {

    const image_url = getImageUrl(bizImage.image_path);

    const [images, setImages] = useState<File>();
    const [previews, setPreviews] = useState<string>(image_url);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = (event : any) => {
        const files = event.target.files[0];
        setImages(files);
        setPreviews(URL.createObjectURL(files));
    };

    const handleUpload = async () => {
        if (!images) {
            toast.error('Please select images to upload.');
            return;
        }

        const supabase = createClient();

        try {
                
            const {data, error } = await uploadImage('images', images);

            if (error) {
                throw error;
            }

            if(!data){
                return { message : "Error" };
            }

            const bizImageData = {
                'biz_id' : bizImage.biz_id,
                'image_id' : bizImage.image_id,
                'image_path' : data.path,
                'full_path' : bizImage.full_path,
            }

            await updateBizImage(bizImage.id, bizImageData);

            // Clear images and previews after upload
            setPreviews("");
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
                className="rounded-md border p-2 hover:bg-gray-100"
                >
                <PencilIcon className="w-5" />
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
                        <div className="preview-container-edit">
                                <div  className="preview-edit">
                                    <img src={previews} alt="preview" />
                                </div>
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

export default BizImageEdit;
