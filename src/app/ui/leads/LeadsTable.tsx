import { FetchLeadsFiletered } from "@/app/lib/leads/data";
import LeadsTableItem from "./LeadTableItem";

export default async function LeadsTable({
    query,
    currentPage,
    status,
    source
}: {
    query: string,
    source: string,
    status: string,
    currentPage: number
}){

    const Leads = await FetchLeadsFiletered(query, currentPage, status, source);
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
            <th scope="col">
                Informacion De Contacto
            </th>
            <th>Status</th>
            <th>
              Fecha de contacto
            </th>
            <th>
              Fuente
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            Leads?.map((item, key) =>{
                return(
                    <LeadsTableItem
                        key={key}
                        id={item.id}
                        numlist={key}
                        contac_name={item.contact_name}
                        contact_email={item.contact_email}
                        contact_phone={item.contact_phone}
                        contact_company={item.company_name}
                        status={item.status}
                        date_first_contact_date={item.date_of_first_contact}
                        source={item.source}
                    />
                )
            })
          }
        </tbody>
      </table>
    );
}