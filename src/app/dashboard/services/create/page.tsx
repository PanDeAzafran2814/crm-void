import ServiceFormCreate from "@/app/ui/services/ServiceFormCreate";

export default async function ServiceCreate() {
  return (
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
        <ServiceFormCreate/>
    </div>
  );
}