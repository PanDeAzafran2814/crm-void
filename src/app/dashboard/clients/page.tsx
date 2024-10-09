import { CountClientsFiltered } from "@/app/lib/data";
import ClientsTable from "@/app/ui/clients/ClientsTable";
import Pagination from "@/app/ui/pagination";
import SearchTable from "@/app/ui/searchtable";
import {TableSkeleton} from "@/app/ui/skeletons";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
  searchParams
}: {
  searchParams?:{
    query?:string;
    page?:string;
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await CountClientsFiltered(query);
  return (
    <div className="relative p-6 space-y-8 overflow-y-auto h-full w-full shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
        <label className="sr-only">Search</label>
        <Link href="/dashboard/clients/create">
          <div className="text-white bg-PrimaryBg p-2 rounded-lg flex space-x-2 hover:bg-PrimaryAct transition-all duration-700 cursor-pointer">
            <PlusCircleIcon className="w-5 h-5" />
            <p>Nuevo Cliente</p>
          </div>
        </Link>
        <div className="relative">
          <SearchTable placeholder="Busqueda de Clientes"/>
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
        <ClientsTable query={query} currentPage={currentPage} location="clients"/>
      </Suspense>
      <Pagination totalPages={totalPages}/>
    </div>
  );
}