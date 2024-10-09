import { CountDashboardClientCard } from "../lib/data";
import ChartInvoiceBills from "../ui/dashboard/ChartInvoiceBills";
import Card from "../ui/dashboard/card";
import ClientsCard from "../ui/dashboard/clientsCard";
import TopServices from "../ui/dashboard/topservices";

export default async function Dashboard() {
  const ClientsCardInfo = await CountDashboardClientCard();
  return (
    <div className="p-6 space-y-8 overflow-y-auto h-full w-full">
      <div className="flex justify-between">
        <Card type="invoices" NumericOrCurrency="Currency"  total={10} totalDisabled={5} totalEnabled={5} percentDisabled={50} percentEnabled={50}/>
        <Card type="bills" NumericOrCurrency="Currency"  total={10} totalDisabled={5} totalEnabled={5} percentDisabled={50} percentEnabled={50}/>
        <Card type="status" NumericOrCurrency="Number" total={10} totalDisabled={5} totalEnabled={5} percentDisabled={50} percentEnabled={50}/>
        <Card type="clients" NumericOrCurrency="Number" total={ClientsCardInfo.totalcount} totalDisabled={ClientsCardInfo.totalDisabled} totalEnabled={ClientsCardInfo.totalEnabled} percentDisabled={ClientsCardInfo.percentDisabled} percentEnabled={ClientsCardInfo.percentEnabled}/>
      </div>
      <div className="flex justify-between">
        <div className="w-[49%]">
          <ChartInvoiceBills />
        </div>
        <div className="w-[49%]">
          <TopServices />
        </div>
      </div>
      <div className="mb-10">
        <ClientsCard />
      </div>
    </div>
  );
}