import Link from 'next/link';
import NavLinks from '@/components/ui/dashboard/nav-links';
import Logo from '@/components/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import signOut from '@/app/login/action';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex items-end justify-start rounded-md p-4"
        href="/"
      >
        <div className="w-46 text-white md:w-46">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-blue-50 md:block"></div>
        <form action={signOut}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-blue-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
