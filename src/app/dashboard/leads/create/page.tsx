import LeadsFormCreate from "@/app/ui/leads/LeadsFormCreate";

export default async function LeadsCreate() {
  return (
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
      <LeadsFormCreate/>
    </div>
  );
}