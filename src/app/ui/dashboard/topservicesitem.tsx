import {
    GlobeAltIcon,
    ServerStackIcon,
    DevicePhoneMobileIcon,
    WrenchScrewdriverIcon,
    ComputerDesktopIcon,
    PencilSquareIcon,
  } from "@heroicons/react/24/outline";
  
  const ICONS = {
    web: GlobeAltIcon,
    host: ServerStackIcon,
    app: DevicePhoneMobileIcon,
    support: WrenchScrewdriverIcon,
    crm: ComputerDesktopIcon,
    graphicdesign: PencilSquareIcon,
  };
  
  const NAMES = {
    web: "Web",
    host: "Hosting",
    app: "Mobile App",
    support: "Web, Tech Support",
    crm: "CRM Rent",
    graphicdesign: "Diseño Grafico",
  };
  
  const BGCOLOR = {
    web: "bg-[#3498DB]",
    host: "bg-[#607D8B]",
    app: "bg-[#2ECC71]",
    support: "bg-[#E67E22]",
    crm: "bg-[#34568B]",
    graphicdesign: "bg-[#8E44AD]",
  };
  
  export default function ServicesItem({
    type,
  }: {
    type: "web" | "host" | "app" | "support" | "crm" | "graphicdesign";
  }) {
    const Icon = ICONS[type] || GlobeAltIcon;
    const Name = NAMES[type] || "Other";
    const BgColor = BGCOLOR[type] || "#3498DB";
  
    return (
      <div className="flex rounded-lg hover:bg-gray-300 p-2 transition-all duration-700">
        <div className="w-[10%] flex justify-start items-center">
          <div className="">
            <Icon className={`w-10 h-10 text-white ${BgColor} p-2 rounded-lg`} />
          </div>
        </div>
        <div className="w-[70%]">
          <p className="text-2xl font-medium">{Name}</p>
          <p className="text-gray-400 text-sm">Dec 17, 2022 at 22:31 P.M.</p>
        </div>
        <div className="w-[20%] flex justify-center items-center">
          <p className="text-xl font-semibold">$33.08</p>
        </div>
      </div>
    );
  }