'use client'

import moment from "moment";
import {
    GlobeAltIcon,
    ServerStackIcon,
    LockClosedIcon,
    WrenchScrewdriverIcon,
    EnvelopeIcon,
    ComputerDesktopIcon,
    ArrowPathIcon
  } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/app/utils/formaters";
import Swal from "sweetalert2";
import Link from "next/link";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import logovoid from "@/app/assets/images/logo-black.png";
import { DeleteSuscription } from "@/app/lib/suscriptions/actions";

interface Contact {
    nombre: string;
}

const ICONS = {
    DOM: GlobeAltIcon,
    HOST: ServerStackIcon,
    SSL: LockClosedIcon,
    SUP: WrenchScrewdriverIcon,
    Email: EnvelopeIcon,
    CRM: ComputerDesktopIcon,
  };
  
  const NAMES = {
    DOM: "Dominio",
    HOST: "Hosting",
    SSL: "SSL",
    SUP: "Web, Tech Support",
    Email: "Email",
    CRM: "Diseño Grafico",
  };
  
  const BGCOLOR = {
    DOM: "bg-[#3498DB]",
    HOST: "bg-[#607D8B]",
    SSL: "bg-[#2ECC71]",
    SUP: "bg-[#E67E22]",
    Email: "bg-[#34568B]",
    CRM: "bg-[#8E44AD]",
  };

export default function SuscriptionTableItem({
    id,
    numlist,
    renewed_from,
    renewed_from_date,
    client,
    client_logo,
    contact,
    service,
    badge,
    amount,
    formDate,
    renewalDate
}: {
    id: string,
    numlist: number,
    renewed_from: string,
    renewed_from_date : string,
    client: string,
    client_logo: string,
    contact: Contact,
    service: "DOM" | "HOST" | "SSL" | "SUP" | "Email" | "CRM",
    badge: "mxn" | "usd",
    amount: string,
    formDate: string,
    renewalDate: string
}){
    const Icon = ICONS[service] || GlobeAltIcon;
    const Name = NAMES[service] || "Other";
    const BgColor = BGCOLOR[service] || "#3498DB"

    const today = moment();
    const daysRemaining  = moment(renewalDate).diff(today, 'day');

    const deleteRecord = async (id:string) => {
        console.log(id)
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            DeleteSuscription(id)
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
      }

      console.log(renewed_from)

    return(
        <tr className="bg-white border-bhover:bg-gray-50">
            <td className="w-4 p-4 text-center">
                {numlist}
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
                        <Icon className={`w-10 h-10 text-white ${BgColor} p-2 rounded-lg`} />
                    </div>
                    <div>
                        <p className="font-medium text-base">
                            {Name}
                        </p>
                    </div>
                </div>

            </td>
            <td className="text-gray-600 font-medium">
                {formatCurrency(amount)}
            </td>
            <th>
                {
                    badge === "mxn"?
                    "MXN"
                    :badge === "usd"?
                    "USD"
                    :null
                }
            </th>
            <td className="font-bold text-gray-600">
                {moment(formDate).format("LL")}
            </td>
            <td className="font-bold text-gray-600">
                {moment(renewalDate).format("LL")}
            </td>
            <td>
                <div>
                {
                    renewed_from_date ? (
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full me-2 bg-blue-500"></div>
                            <p>Renovado <br /> {moment(renewed_from_date).format("DD/MM/YYYY")}</p>
                        </div>
                    ) : daysRemaining > 0 ? (
                        <div className="flex items-center">
                            <div className={`h-2.5 w-2.5 rounded-full me-2 ${daysRemaining < 15 ? "bg-orange-400" : "bg-green-500"}`}></div>
                            <p>Dentro de {daysRemaining} días</p>
                        </div>
                    ) : daysRemaining < 0 ? (
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full me-2 bg-red-500"></div>
                            <p>Hace {Math.abs(daysRemaining)} días</p>
                        </div>
                    ) : daysRemaining === 0 ? (
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full me-2 bg-red-800 animate-pulse"></div>
                            <p>Vence Hoy</p>
                        </div>
                    ) : null
                }
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-3">
                {
                    (!renewed_from_date && (daysRemaining <= 30 || daysRemaining < 0)) ? (
                        <Link href={`/dashboard/suscription/${id}/renewal`}>
                            <ArrowPathIcon className="w-8 h-8 bg-green-700 text-white rounded-full p-2 duration-700 hover:bg-green-900 cursor-pointer" />
                        </Link>
                    ) : null
                }
                <Link href={`/dashboard/suscription/${id}/view`}>
                    <EyeIcon className="w-8 h-8 bg-blue-900 text-white rounded-full p-2 transition-all duration-700 hover:bg-blue-900 cursor-pointer"/>
                </Link>
                {
                    (!renewed_from_date ? (
                        <Link href={`/dashboard/suscription/${id}/edit`}>
                            <PencilSquareIcon className="w-8 h-8 bg-green-600 text-white rounded-full p-2 transition-all duration-700 hover:bg-green-900 cursor-pointer"/>
                        </Link>
                        ) : null

                    )
                }
                <TrashIcon onClick={()=>{deleteRecord(id)}}  className="w-8 h-8 bg-red-600 text-white rounded-full p-2 duration-700 hover:bg-red-900 cursor-pointer"/>
                </div>
            </td>
        </tr>
    );
}