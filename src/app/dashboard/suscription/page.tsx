import Link from "next/link";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import SearchTable from "@/app/ui/searchtable";
import { CountSuscriptionFiltered } from "@/app/lib/suscriptions/data";
import { Suspense } from "react";
import { TableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/pagination";
import SuscripcionTable from "@/app/ui/suscription/SuscriptionsTable";
import SelectFilter from "@/app/ui/search-select";

const SERVICE_OPTIONS = {
  DOM: "Dominio",
  HOST: "Hosting",
  SSL: "SSL",
  SUP: "Web, Tech Support",
  Email: "Email",
  CRM: "Diseño Grafico",
};

const EXPIRATION_OPTIONS = {
  EXPIRED: "Vencido",
  TOEXPIRE: "Por Vencer",
  UNDEFEATED: "Aun no Vence",
  RENEWAL : "Renovado"
}

export default async function Page({
  searchParams
}: {
  searchParams?:{
    query?:string;
    page?:string;
    service?:string;
    expiration?:string;
  }
}) {
  
  const query = searchParams?.query || '';
  const service = searchParams?.service || '';
  const expiration = searchParams?.expiration || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await CountSuscriptionFiltered(query, service, expiration)
    console.log(service)

  return (
    <div className="relative p-6 space-y-8 overflow-y-auto h-full w-full shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
      <label className="sr-only">Search</label>
      <Link href="/dashboard/suscription/create">
        <div className="text-white bg-PrimaryBg p-2 rounded-lg flex space-x-2 hover:bg-PrimaryAct transition-all duration-700 cursor-pointer">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Nueva Suscipcion</p>
        </div>
      </Link>
      <div className="flex space-x-3">
        <div>
          <p className="text-base font-semibold">Expiracion</p>
          <SelectFilter options={EXPIRATION_OPTIONS} paramName="expiration" placeholder="Busqueda Por Vencimiento" />
        </div>
        <div>
          <p className="text-base font-semibold">Servicio</p>
          <SelectFilter options={SERVICE_OPTIONS} paramName="service" placeholder="Busqueda Por Servicio" />
        </div>
        <div>
          <p className="text-base font-semibold">Cliente</p>
          <SearchTable placeholder="Busqueda Por Cliente"/>
        </div>
      </div>
    </div>
    <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
      <SuscripcionTable query={query} service={service} expiration={expiration} currentPage={currentPage}/>
    </Suspense>
    <Pagination totalPages={totalPages}/>
  </div>
  );
}