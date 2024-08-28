'use client'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react';
import { deleteBiz, deleteCategory, deleteEntity, deleteRatingCategory } from '@/routes/api';
import toast from 'react-hot-toast';
import Modal from './modal';

export function CreateButton(
    {btnName , routeName } : 
    {btnName : string , routeName : string}
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
  {routeName } : 
  { routeName : string}
) {
return (
  <Link
      href={routeName}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
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

