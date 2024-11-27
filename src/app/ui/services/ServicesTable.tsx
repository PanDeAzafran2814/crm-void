import { FetchServiceFiltered } from "@/app/lib/services/data";
import ServiceTableItem from "./ServiceTableItem";

export default async function ServicesTable({
    query,
    currentPage,
    service,
    status
}: {
    query: string,
    currentPage: number,
    service: string,
    status: string
}){

    const Services = await FetchServiceFiltered(query, currentPage, service, status);
    return(
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              #ID
            </th>
            <th scope="col">
              Informacion De Cliente
            </th>
            <th scope="col">Servicio</th>
            <th>
              Costo
            </th>
            <th>
              Divisa
            </th>
            <th>
              Fecha De Inicio
            </th>
            <th>
                Fecha de Entrega
            </th>
            <th>
              Status
            </th>
            <th>Tareas</th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            Services?.map((item, key) =>{
                return(
                    <ServiceTableItem
                        key={key}
                        id={item.id}
                        numlist={item.service_id}
                        client={item.client.name}
                        client_logo={item.client.client_logo}
                        contact={item.client.contacts[item.contact]}
                        service={item.service}
                        badge={item.badge}
                        amount={item.total}
                        start_date={item.start_date}
                        finish_date={item.finish_date}
                        Status={item.status}
                        tasks={item.tasks}
                    />
                )
            })
          }
        </tbody>
      </table>
    );
}