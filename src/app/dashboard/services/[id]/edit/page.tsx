import { fetchServiceByID } from "@/app/lib/services/data";
import EditServicesForm from "@/app/ui/services/EditServices";
import { notFound } from "next/navigation";

export default async function Page({params}: { params: { id: string} }){
    const id = params.id
    const service = await fetchServiceByID(id);

    if(service.status === 400 || service.data == null || service.data.length === 0){
        notFound();
    }
    
    
return(
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
        <EditServicesForm serviceData={service.data[0]}/>
    </div>
    );
}