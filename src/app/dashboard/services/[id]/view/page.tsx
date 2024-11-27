import { fetchServiceByID } from "@/app/lib/services/data";
import ViewService from "@/app/ui/services/ViewService";
import { notFound } from "next/navigation";

export default async function Page({params}: { params: { id: string} }){
    const id = params.id
    const services = await fetchServiceByID(id);
    
    if(services.status === 400 || services.data == null || services.data.length === 0){
       notFound();
    }
    
return(
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
        <ViewService serviceData={services.data[0]}/>
    </div>
    );
}