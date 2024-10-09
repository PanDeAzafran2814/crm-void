'use client';
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "../lib/utils";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ totalPages  }: { totalPages: number }){
    
    const pathname = usePathname();
    const searchparams = useSearchParams();
    const currentPage = Number(searchparams.get('page')) || 1;
    const allPages = generatePagination(currentPage, totalPages);

    const createPageURL = (page: string | number) => {
        const params = new URLSearchParams(searchparams);
        params.set('page', page.toString());
        return `${pathname}?${params}`;
      };

    return(
        <div className="flex justify-center my-4">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    <PaginationArrow
                        direction="left"
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1}
                    />
                    {
                        allPages.map((page) => {
                            return(
                                <PaginationNumber
                                    key={page}
                                    href={createPageURL(page)}
                                    page={page}
                                    isActive={currentPage === page}
                                />
                            )
                        })
                    }
                    <PaginationArrow
                        direction="right"
                        href={createPageURL(currentPage + 1)}
                        isDisabled={currentPage >= totalPages}
                    />
                    
                </ul>
            </nav>
        </div>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
}:{
    page: number | string;
    href: string;
    isActive: boolean;
}) {
    return (
        <li>
            <Link href={href}>
                <p className={
                    `flex items-center justify-center px-4 h-10 leading-tight
                    ${
                        isActive?
                        "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                        :
                        "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    }`
                }>
                    {page}
                </p>
            </Link>
        </li>
    )
}

function PaginationArrow({
    href,
    direction,
    isDisabled
}:{
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}) {
    return isDisabled ? (
        <li>
                <p className={
                    direction === 'left' ?
                    "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-not-allowed"
                    :
                    "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-not-allowed"
                }>
                    {
                        direction === 'left' ?
                        <ChevronLeftIcon className="text-gray-500 w-4 h-4"/>
                        :
                        <ChevronRightIcon className="text-gray-500 w-4 h-4"/>
                    }
                </p>
        </li>
    ) : (
        <li>
            <Link href={href}>
                <p className={
                    direction === 'left' ?
                    "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                    :
                    "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                }>
                    {
                        direction === 'left' ?
                        <ChevronLeftIcon className="text-gray-500 w-4 h-4"/>
                        :
                        <ChevronRightIcon className="text-gray-500 w-4 h-4"/>
                    }
                </p>
            </Link>
        </li>
    )
}