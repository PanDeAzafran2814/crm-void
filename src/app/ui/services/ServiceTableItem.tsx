'use client'

import logovoid from "@/app/assets/images/logo-black.png";
import { formatCurrency } from "@/app/utils/formaters";
import { ArrowPathIcon, CheckBadgeIcon, DevicePhoneMobileIcon, EyeIcon, ForwardIcon, GlobeAltIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon, WrenchScrewdriverIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { CalendarDateRangeIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";


interface Contact {
    nombre: string;
}

interface Tasks {
    nombre: string;
}

const SERVICE_ICONS = {
    SUPPORT: WrenchScrewdriverIcon,
    WDEV: GlobeAltIcon,
    WDESING: GlobeAltIcon,
    CHANGESWEB: GlobeAltIcon,
    EXPORWEB: GlobeAltIcon,
    UPWEB: GlobeAltIcon,
    APPDEV: DevicePhoneMobileIcon,
    APPDESING: DevicePhoneMobileIcon,
    CHANGESAPP: DevicePhoneMobileIcon,
    UPAPP: DevicePhoneMobileIcon,
    BRANDING: PencilSquareIcon,
    LOGODESING: PencilSquareIcon,
    INDESING: PencilSquareIcon
}

const SERVICE_NAMES = {
    SUPPORT: "Soporte",
    WDEV: "Desarrollo Web",
    WDESING: "Diseño Web",
    CHANGESWEB: "Cambios En Sitio Web",
    EXPORWEB: "Migracion De Sitio Web",
    UPWEB: "Actualizacion De Sitio Web",
    APPDEV: "Desarrollo App Movil",
    APPDESING: "Diseño App Movil",
    CHANGESAPP: "Cambios En APP Movil",
    UPAPP: "Actualizacion De App Movil",
    BRANDING: "Branding",
    LOGODESING: "Diseño De Logo",
    INDESING: "Diseño Individual"
}

const SERVICE_COLORS = {
    SUPPORT: "bg-[#E67E22]",
    WDEV: "bg-[#3498DB]",
    WDESING: "bg-[#3498DB]",
    CHANGESWEB: "bg-[#3498DB]",
    EXPORWEB: "bg-[#3498DB]",
    UPWEB: "bg-[#3498DB]",
    APPDEV: "bg-[#2ECC71]",
    APPDESING: "bg-[#2ECC71]",
    CHANGESAPP: "bg-[#2ECC71]",
    UPAPP: "bg-[#2ECC71]",
    BRANDING: "bg-[#8E44AD]",
    LOGODESING: "bg-[#8E44AD]o",
    INDESING: "bg-[#8E44AD]"
}

const STATUS_ICONS = {
    NEW: PlusCircleIcon,
    INPROGRESS: WrenchScrewdriverIcon,
    CANCELED: XCircleIcon,
    FIISHED: CheckBadgeIcon,
    POSTPONED: ForwardIcon,
    DATECHANGE: CalendarDateRangeIcon
}

const STATUS_NAMES = {
    NEW: "Nuevo",
    INPROGRESS: "En Progeso",
    CANCELED: "Cancelado",
    FIISHED: "Finalizado",
    POSTPONED: "Pospuesto",
    DATECHANGE: "Fecha Cambiada",
}

const STATUS_COLORS = {
    NEW: "bg-[#E67E22]",
    INPROGRESS: "bg-[#ff651d]",
    CANCELED: "bg-[#ff2222]",
    FIISHED: "bg-[#49a02f]",
    POSTPONED: "bg-[#ff651d]",
    DATECHANGE: "bg-[#ff651d]",
}


export default function ServiceTableItem({
    id,
    numlist,
    client,
    client_logo,
    contact,
    service,
    badge,
    amount,
    start_date,
    finish_date,
    Status,
    tasks
}: {
    id: string,
    numlist: number,
    client: string, 
    client_logo: string,
    contact: Contact,
    service: 'SUPPORT' | 'WDEV' | 'WDESING' | 'CHANGESWEB' | 'EXPORWEB' | 'UPWEB' | 'APPDEV' | 'APPDESING' | 'CHANGESAPP' | 'UPAPP' | 'BRANDING' | 'LOGODESING' | 'INDESING',
    badge: "mxn" | "usd",
    amount: string,
    start_date: string,
    finish_date: string,
    Status: 'NEW' | 'INPROGRESS' | 'CANCELED' | 'FIISHED' | 'POSTPONED' | 'DATECHANGE',
    tasks: Tasks[]
}){

    const Icon_Service = SERVICE_ICONS[service] || GlobeAltIcon;
    const Name_Service = SERVICE_NAMES[service] || "Other";
    const BgColor_Service = SERVICE_COLORS[service] || "bg-[#E67E22]"

    const Icon_Status = STATUS_ICONS[Status] || GlobeAltIcon;
    const Name_Status = STATUS_NAMES[Status] || "Other";
    const BgColor_Status = STATUS_COLORS[Status] || "bg-[#E67E22]";

    console.log(tasks)

    const lenght = tasks.length;

    return(
        <tr className="bg-white border-bhover:bg-gray-50">
            <td className="w-4 p-4 text-center">
                #{numlist}
            </td>
            <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img
                    width={40}
                    height={40}
                    className="rounded-full"
                    src={client_logo ? client_logo : logovoid.src}
                    alt="Company Image"
                />
                <div className="ps-3">
                    <p className="text-base font-semibold">{client}</p>
                    <p className="text-sm font-semibold">{contact?.nombre}</p>
                </div>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <Icon_Service className={`w-10 h-10 text-white ${BgColor_Service} p-2 rounded-lg`} />
                    </div>
                    <div>
                        <p className="font-medium text-base">
                            {Name_Service}
                        </p>
                    </div>
                </div>
            </td>
            <td className="text-gray-600 font-medium">
                {formatCurrency(amount)}
            </td>
            <td>
                {
                    badge === "mxn"?
                    "MXN"
                    :badge === "usd"?
                    "USD"
                    :null
                }
            </td>
            <td className="font-bold text-gray-600">
                {moment(start_date).locale("es").format("LL")}
            </td>
            <td className="font-bold text-gray-600">
                {moment(finish_date).locale("es").format("LL")}
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <Icon_Status className={`w-10 h-10 text-white ${BgColor_Status} p-2 rounded-lg`} />
                    </div>
                    <div>
                        <p className="font-medium text-base">
                            {Name_Status}
                        </p>
                    </div>
                </div>
            </td>
            <td className="text-center">
                {
                    lenght
                }
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-3">
                    <Link href={`/dashboard/services/${id}/reuse`}>
                        <ArrowPathIcon className="w-8 h-8 bg-green-800 text-white rounded-full p-2 transition-all duration-700 hover:bg-blue-900 cursor-pointer"/>
                    </Link>
                    <Link href={`/dashboard/services/${id}/view`}>
                        <EyeIcon className="w-8 h-8 bg-blue-900 text-white rounded-full p-2 transition-all duration-700 hover:bg-blue-900 cursor-pointer"/>
                    </Link>
                    <Link href={`/dashboard/services/${id}/edit`}>
                        <PencilSquareIcon className="w-8 h-8 bg-green-600 text-white rounded-full p-2 transition-all duration-700 hover:bg-green-900 cursor-pointer"/>
                    </Link>
                    <TrashIcon className="w-8 h-8 bg-red-600 text-white rounded-full p-2 duration-700 hover:bg-red-900 cursor-pointer"/>

                </div>
            </td>
        </tr>
    );
}