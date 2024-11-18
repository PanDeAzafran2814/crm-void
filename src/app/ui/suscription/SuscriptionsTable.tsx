import { FetchSuscriptionsFiltered } from "@/app/lib/suscriptions/data";
import SuscriptionTableItem from "./SuscriptionTableItem";

export default async function SuscripcionTable({
    query,
    currentPage,
    service,
    expiration
}: {
    query: string,
    currentPage: number,
    service: string,
    expiration: string
}){

    const Suscrptions = await FetchSuscriptionsFiltered(query, currentPage, service, expiration);
    return(
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              N°
            </th>
            <th scope="col">
              Informacion De Cliente
            </th>
            <th>Servicio</th>
            <th>
              Costo
            </th>
            <th>
              Divisa
            </th>
            <th>
              Fecha de Suscripcion
            </th>
            <th>
                Fecha de Renovacion
            </th>
            <th>
              Vence / o
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            Suscrptions?.map((item, key) =>{
                return(
                    <SuscriptionTableItem
                        key={key}
                        id={item.id}
                        numlist={key}
                        renewed_from={item.renewed_from}
                        renewed_from_date={item.renewed_from_date}
                        client={item.client.name}
                        client_logo={item.client.client_logo}
                        contact={item.client.contacts[item.contact]}
                        service={item.service}
                        badge={item.badge}
                        amount={item.total}
                        formDate={item.form_date}
                        renewalDate={item.renewal_date}
                    />
                )
            })
          }
        </tbody>
      </table>
    );
}