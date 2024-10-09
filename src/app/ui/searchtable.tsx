'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchTable({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }, 650);
  return (
    <>
        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
        </div>
        <input
            type="text"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-gray-500 outline-none"
            onChange={(event) => {
                handleSearch(event.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
            placeholder={placeholder}
        />
    </>
  );
}