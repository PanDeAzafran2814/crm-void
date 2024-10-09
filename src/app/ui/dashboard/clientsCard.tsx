
//import { CountClientsFiltered } from "@/app/lib/data";
import { Suspense } from "react";
import ClientsTable from "../clients/ClientsTable";

export default async function ClientsCard() {
  const query = '';
  const currentPage = 1;
  //const totalPages = await CountClientsFiltered(query);
  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
        <label className="sr-only">Search</label>
        <div>
          <p className="text-2xl font-semibold">Clientes</p>
        </div>
        <div className="relative">
          
        </div>
      </div>
      <Suspense key={query + currentPage}>
        <ClientsTable query={query} currentPage={currentPage} location="dashboard"/>
      </Suspense>
    </div>
  );
}