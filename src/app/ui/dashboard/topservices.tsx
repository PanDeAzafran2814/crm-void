import ServicesItem from "./topservicesitem";

export default function TopServices() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-semibold">Top Servicios</p>
        </div>
        <div>
          <div>
            <p className="text-base text-gray-400">Ver Todos</p>
          </div>
        </div>
      </div>
      <div className="py-4 space-y-4">
        <ServicesItem type="web" />
        <ServicesItem type="host" />
        <ServicesItem type="app" />
        <ServicesItem type="support" />
        <ServicesItem type="crm" />
      </div>
    </div>
  );
}