import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Status({ status }: { status: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-400 text-white': status === false,
          'bg-green-500 text-white': status === true,
        },
      )}
    >
      {status === false ? (
        <>
          Off
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === true ? (
        <>
          On
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
