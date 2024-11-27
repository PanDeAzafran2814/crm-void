import Link from "next/link";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import SearchTable from "@/app/ui/searchtable";
import { Suspense } from "react";
import { TableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/pagination";
import SelectFilter from "@/app/ui/search-select";
import { CountServiceFiltered } from "@/app/lib/services/data";
import ServicesTable from "@/app/ui/services/ServicesTable";

const SERVICE_NAMES = {
  SUPPORT: "Soporte",
  WDEV: "Desarrollo Web",
  WDESING: "Diseño Web",
  CHANGESWEB: "Cambios En Sitio Web",
  EXPORWEB: "Migracion De Sitio Web",
  UPWEB: "Actualizacion De Sitio Web",
  APPDEV: "Desarrollo App Movil",
  APPDESING: "Diseño App Movil",
  CHANGESAPP: "Cambios En APP Movil",
  UPAPP: "Actualizacion De App Movil",
  BRANDING: "Branding",
  LOGODESING: "Diseño De Logo",
  INDESING: "Diseño Individual"
}

const STATUS_NAMES = {
  NEW: "Nuevo",
  INPROGRESS: "En Progeso",
  CANCELED: "Cancelado",
  FIISHED: "Finalizado",
  POSTPONED: "Pospuesto",
  DATECHANGE: "Fecha Cambiada",
}

export default async function Page({
  searchParams
}: {
  searchParams?:{
    query?:string;
    page?:string;
    service?:string;
    status?:string;
  }
}) {
  
  const query = searchParams?.query || '';
  const service = searchParams?.service || '';
  const status = searchParams?.status || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await CountServiceFiltered(query, service, status)

  return (
    <div className="relative p-6 space-y-8 overflow-y-auto h-full w-full shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
      <label className="sr-only">Search</label>
      <Link href="/dashboard/services/create">
        <div className="text-white bg-PrimaryBg p-2 rounded-lg flex space-x-2 hover:bg-PrimaryAct transition-all duration-700 cursor-pointer">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Nuevo Servicio</p>
        </div>
      </Link>
      <div className="flex space-x-3">
        <div>
          <p className="text-base font-semibold">Status</p>
          <SelectFilter options={STATUS_NAMES} paramName="status" placeholder="Busqueda Por Status" />
        </div>
        <div>
          <p className="text-base font-semibold">Servicio</p>
          <SelectFilter options={SERVICE_NAMES} paramName="service" placeholder="Busqueda Por Servicio" />
        </div>
        <div>
          <p className="text-base font-semibold">Cliente</p>
          <SearchTable placeholder="Busqueda Por Cliente"/>
        </div>
      </div>
    </div>
    <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
      <ServicesTable query={query} service={service} status={status} currentPage={currentPage} />
    </Suspense>
    <Pagination totalPages={totalPages}/>
  </div>
  );
}