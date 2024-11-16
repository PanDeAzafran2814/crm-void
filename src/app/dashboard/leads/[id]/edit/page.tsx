import { fetchLeadByID } from "@/app/lib/leads/data";
import LeadsFormEdit from "@/app/ui/leads/EditLeadForm";
import { notFound } from "next/navigation";

export default async function Page({params}: { params: { id: string} }){
    const id = params.id
    const lead = await fetchLeadByID(id);

    if(lead.status === 400 || lead.data == null || lead.data.length === 0){
        notFound();
    }
    
    
return(
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
        <LeadsFormEdit leadData={lead.data[0]}/>
    </div>
    );
}