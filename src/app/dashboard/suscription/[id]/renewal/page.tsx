import { fetchSuscriptionsByID } from "@/app/lib/suscriptions/data";
import RenwalSuscriptionForm from "@/app/ui/suscription/RenewalSuscription";
import { notFound } from "next/navigation";

export default async function Page({params}: { params: { id: string} }){
    const id = params.id
    const suscripcion = await fetchSuscriptionsByID(id);

    if(suscripcion.status === 400 || suscripcion.data == null || suscripcion.data.length === 0){
        notFound();
    }
    
    
return(
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
        <RenwalSuscriptionForm suscripcionData={suscripcion.data[0]}/>
    </div>
    );
}