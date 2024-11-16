import Link from "next/link";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import SearchTable from "@/app/ui/searchtable";
import { Suspense } from "react";
import { TableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/pagination";
import { CountLeadFiltered } from "@/app/lib/leads/data";
import LeadsTable from "@/app/ui/leads/LeadsTable";
import SelectFilter from "@/app/ui/search-select";

const STATUS_OPTIONS = {
  CONTACT: "Contactar",
  CONTACTED: "Contactado",
  CLOSED: "Cerrado",
  UNANSWERED: "Sin Respuesta",
  WAITINGMEETING: "Esperando Agengar Reunion",
  EMAILSEND: "Correo Enciado",
  WHATSAPPSEND: "Whatsapp Enviado",
  WAITINGANSERED: "Esperando Respuesta",
};

const SOURCE_OPTIONS = {
  MAPS: "Google Maps",
  GOOGLE: "Google Search",
  FB: "Facebook",
  INSTA: "Instagram",
  TIKTOK: "Tik Tok",
  WP: "Whatsapp",
  MAIL: "Correo Electronico",
  CALL: "Llamada",
  VOIDFORM: "Formulario Web",
  ADVISE: "Recomendarion 3ros",
  LINKFOOTER: "Link En Sitios De Clientes",
  INPERSON: "En Persona",
  BUSSINESCARD: "Tarjeta De Presentacion"
};

export default async function Page({
  searchParams
}: {
  searchParams?:{
    query?:string;
    page?:string;
    source?:string;
    status?:string;
  }
}) {
  
  const query = searchParams?.query || '';
  const source = searchParams?.source || '';
  const status = searchParams?.status || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await CountLeadFiltered(query, status, source)
  

  return (
    <div className="relative p-6 space-y-8 overflow-y-auto h-full w-full shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
      <label className="sr-only">Search</label>
      <Link href="/dashboard/leads/create">
        <div className="text-white bg-PrimaryBg p-2 rounded-lg flex space-x-2 hover:bg-PrimaryAct transition-all duration-700 cursor-pointer">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Nuevo Lead</p>
        </div>
      </Link>
      <div className="flex space-x-3">
        <div>
          <p className="text-base font-semibold">Fuente</p>
          <SelectFilter options={SOURCE_OPTIONS} paramName="source" placeholder="Buscar Por Fuente" />
        </div>
        <div>
          <p className="text-base font-semibold">Status</p>
          <SelectFilter options={STATUS_OPTIONS} paramName="status" placeholder="Buscar Por Status" />
        </div>
        <div>
          <p className="text-base font-semibold">Informacion</p>
          <SearchTable placeholder="Busqueda de Leads"/>
        </div>
      </div>
    </div>
    <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
      <LeadsTable query={query} source={source} status={status} currentPage={currentPage}/>
    </Suspense>
    <Pagination totalPages={totalPages}/>
  </div>
  );
}