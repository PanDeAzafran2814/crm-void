'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
export default function Search({ placeholder }: { placeholder: string }) {

  return (
    <div className="w-[60%] flex items-center border border-gray-500 rounded-full px-2">
        <MagnifyingGlassIcon className="text-black w-5 h-5" />
        <input 
            placeholder={placeholder}
            type="text" 
            className="outline-none w-full" 
        />
    </div>
  );
}