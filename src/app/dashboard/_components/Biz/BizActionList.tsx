'use client'
import dynamic from 'next/dynamic';
import { useState } from "react";
import { ChatBubbleBottomCenterTextIcon, ChevronDownIcon, EyeIcon, PencilIcon, PhotoIcon, StarIcon } from "@heroicons/react/24/solid";
import { CustomButton, DeleteBiz, DetailButton, UpdateButton } from '@/components/ui/action-button';
import Link from 'next/link';

const BizActionDropdown = ({ bizId }: { bizId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (

    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md"
      >
        Actions
        <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10"
          role="menu"
        >
          <div className="py-1">

            <Link
              href={`/dashboard/bizs/${bizId}/edit`}
              className={'flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100'}
            >
              <PencilIcon className="w-5" /><span>Edit</span>
            </Link>

            <Link
              href={`/dashboard/bizs/${bizId}/detail`}
              className={'flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100'}
            >
              <EyeIcon className="w-5" /><span>View</span>
            </Link>

            <Link
              href={`/dashboard/bizs/${bizId}/images`}
              className={'flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100'}
            >
              <PhotoIcon className="w-5" /><span>Photo</span>
            </Link>

            <Link
              href={`/dashboard/bizs/${bizId}/ratings`}
              className={'flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100'}
            >
              <StarIcon className="w-5" /><span>Rate</span>
            </Link>

            <DeleteBiz id={bizId} />
          </div>
        </div>
      )}
    </div>
  );
};

// Export BizActionDropdown with client-side rendering only
export default dynamic(() => Promise.resolve(BizActionDropdown), { ssr: false });
