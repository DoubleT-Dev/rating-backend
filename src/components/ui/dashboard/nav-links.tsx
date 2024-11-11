'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BuildingStorefrontIcon,
  StarIcon,
  ListBulletIcon,
  TagIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
// import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Categories', href: '/dashboard/categories', icon: DocumentDuplicateIcon},
  { name: 'Biz', href: '/dashboard/bizs', icon: BuildingStorefrontIcon },
  { name: 'Rating Category', href: '/dashboard/rating-categories', icon: ListBulletIcon },
  { name: 'Tag', href: '/dashboard/tags', icon: TagIcon },
  { name: 'Editor', href: '/dashboard/editors', icon: PencilIcon },
  // { name: 'Rating Lists', href: '/dashboard/ratings', icon: StarIcon },
]

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-blue-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )} >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
