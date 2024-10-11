//import EditClientForm from "@/app/ui/clients/edit-form";
import { fetchClientByID } from "@/app/lib/actions";
import { notFound } from "next/navigation";

export default async function Page({params}: { params: { id: string} }){
    const id = params.id
    const client = await fetchClientByID(id);

    if(client.status === 400 || client.data == null || client.data.length === 0){
        notFound();
    }
    
    
return(
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
        <pre>
            {JSON.stringify(client.data[0], null, 2)}
        </pre>
    </div>
    );
}