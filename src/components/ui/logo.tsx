import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/ui/fonts';
import Image from 'next/image';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} items-center leading-none text-white`}
    >
      <Image 
        src='/bellolae.png'
        className="rounded-full"
        alt="bellolae"
        width={350}
        height={350}
      />
    </div>
  );
}
