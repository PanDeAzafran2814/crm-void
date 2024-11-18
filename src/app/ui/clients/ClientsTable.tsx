import { FetchClientsFiltered } from "@/app/lib/data";
import ClientTableItem from "./ClientsTableItem";

export default async function ClientsTable({
    query,
    status,
    currentPage,
    location
}: {
    query:string,
    status: string,
    currentPage:number,
    location:string
}) {
    const Clients = await FetchClientsFiltered(query, currentPage, location, status);
    return(
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              N°
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Informacion Contacto
            </th>
            <th>Fecha De Associacion</th>
            <th>
              Ciudad
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            Clients?.map((item,key)=>{
              return(
                <ClientTableItem 
                  key={key} 
                  id={item.id} 
                  numlist={key} 
                  logo={item.client_logo} 
                  name={item.name} 
                  contact_email={item.contact_email}
                  contact_phone={item.contact_phone}
                  contact_city={item.contact_city}
                  enable={item.enable}
                  location={location}
                  association_date={item.association_date}
                />
              )
            })
          }
        </tbody>
      </table>
    )
}