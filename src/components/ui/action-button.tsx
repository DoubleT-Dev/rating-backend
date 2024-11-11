'use client'
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon, PhotoIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useState } from 'react';
import { deleteAddress, deleteBiz, deleteBizImage, deleteCategory, deleteRatingCategory, deleteTag } from '@/routes/api';
import clsx from 'clsx';
import Modal from './modal';

export function CreateButton(
  { btnName, routeName }:
    { btnName: string, routeName: string }
) {
  return (
    <Link
      href={routeName}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{btnName}</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateButton(
    { routeName, className } :
    { routeName: string, className : string }
) {
  return (
    <Link
      href={routeName}
      className={clsx(
        'rounded-md border p-2 hover:bg-gray-100',
        className
      )}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function CustomButton(
  { routeName, className } :
  { routeName: string, className : string }
) {
  return (
    <Link
      href={routeName}
      className={clsx(
        'rounded-md border p-2 hover:bg-gray-100',
        className
      )}
    >
      <PhotoIcon className="w-5" />
    </Link>
  );
}

// export function CommentButton(
//   { routeName, className } :
//   { routeName: string, className : string }
// ) {
//   return (
//     <Link
//       href={routeName}
//       className={clsx(
//         'rounded-md border p-2 hover:bg-gray-100',
//         className
//       )}
//     >
//       <ChatBubbleBottomCenterTextIcon className="w-5" /><span>Comment</span>
//     </Link>
//   );
// }

export function DetailButton(
  { routeName, className } :
  { routeName: string, className : string }
) {
  return (
    <Link
      href={routeName}
      className={clsx(
        'flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100',
        className
      )}
    >
      <EyeIcon className="w-5" /><span>View</span>
    </Link>
  );
}

export function DeleteCategory({ id }: { id: string }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(id); // Call your delete function here
    setIsModalOpen(false); // Close the modal after deletion
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  return (
    <>
      <form onSubmit={handleDeleteClick}>
        <button className="rounded-md border p-2 bg-red-500 hover:bg-red-700">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 text-white" />
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}

export function DeleteBiz({ id }: { id: string }) {
  // const deleteID = deleteBiz.bind(null, id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteBiz(id); // Call your delete function here
    setIsModalOpen(false); // Close the modal after deletion
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  return (
    <>
      <div className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100">
        <form onSubmit={handleDeleteClick}>
          <button className="flex items-center gap-1">
            <TrashIcon className="w-5" /><span>Delete</span>
          </button>
        </form>

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}

export function DeleteRatingCategory({ id }: { id: string }) {
  // const deleteWithId = deleteRatingCategory.bind(null, id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true); // Open the modal when the delete button is clicked
  };

  const handleConfirmDelete = () => {
    deleteRatingCategory(id); // Call your delete function here
    setIsModalOpen(false); // Close the modal after deletion
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  return (
    <>
      <form onSubmit={handleDeleteClick}>
        <button className="rounded-md border p-2 bg-red-500 hover:bg-red-700">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 text-white" />
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />
    </>

  );
}


export function DeleteTag({ id }: { id: string }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTag(id); // Call your delete function here
    setIsModalOpen(false); // Close the modal after deletion
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  return (
    <>
      <form onSubmit={handleDeleteClick}>
        <button className="rounded-md border p-2 bg-red-500 hover:bg-red-700">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 text-white" />
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}

export function DeleteAddress({ id }: { id: string }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteAddress(id); // Call your delete function here
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleDeleteClick}>
        <button className="rounded-md border p-2 bg-red-500 hover:bg-red-700">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 text-white" />
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}

export function DeleteBizImage({ id }: { id: string }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteBizImage(id); // Call your delete function here
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleDeleteClick}>
        <button className="rounded-md border p-2 bg-red-500 hover:bg-red-700">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 text-white" />
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}
