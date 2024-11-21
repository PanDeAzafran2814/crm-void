'use client'

import { DeleteLead } from "@/app/lib/leads/actions";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/16/solid"
import { ArrowLeftEndOnRectangleIcon, BuildingStorefrontIcon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleOvalLeftIcon, EnvelopeIcon, EnvelopeOpenIcon, EyeIcon, GlobeAltIcon, LockClosedIcon, PaperAirplaneIcon, PencilSquareIcon, PhoneIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import moment from "moment";
import Link from "next/link";
import Swal from "sweetalert2";

const ICONS_STATUS = {
    CONTACT: PaperAirplaneIcon,
    CONTACTED: ChatBubbleBottomCenterTextIcon,
    CLOSED: LockClosedIcon,
    UNANSWERED: ChatBubbleOvalLeftIcon,
    WAITINGMEETING: ArrowLeftEndOnRectangleIcon,
    EMAILSEND: EnvelopeOpenIcon,
    WHATSAPPSEND: ChatBubbleLeftEllipsisIcon,
    WAITINGANSERED: ChatBubbleBottomCenterIcon
};

const NAMES_STATUS = {
    CONTACT: "Contactar",
    CONTACTED: "Contactado",
    CLOSED: "Cerrado",
    UNANSWERED: "Sin Respuesta",
    WAITINGMEETING: "Esperando Agengar Reunion",
    EMAILSEND: "Correo Enviado",
    WHATSAPPSEND: "Whatsapp Enviado",
    WAITINGANSERED: "Esperando Respuesta",
};

const COLORS_STATUS = {
    CONTACT: "bg-green-600",
    CONTACTED: "bg-orange-500",
    CLOSED: "bg-red-700",
    UNANSWERED: "bg-red-700",
    WAITINGMEETING: "bg-orange-500",
    EMAILSEND: "bg-orange-500",
    WHATSAPPSEND: "bg-orange-500",
    WAITINGANSERED: "bg-orange-500",
}

const NAMES_SOURCE = {
    MAPS: "Google Maps",
    GOOGLE: "Google Search",
    FB: "Facebook",
    INSTA: "Instagram",
    TIKTOK: "Tik Tok",
    WP: "Whatsapp",
    MAIL: "Correo Electronico",
    CALL: "Llamada",
    VOIDFORM: "Formulario Web",
    ADVISE: "Recomendarion 3ros",
    LINKFOOTER: "Link En Sitios De Clientes",
    INPERSON: "En Persona",
    BUSSINESCARD: "Tarjeta De Presentacion"
};

export default function LeadsTableItem({
    id,
    numlist,
    contac_name,
    contact_email,
    contact_phone,
    contact_company,
    status,
    date_first_contact_date,
    source
}: {
    id: string,
    numlist: number,
    contac_name: string,
    contact_email: string,
    contact_phone: string,
    contact_company: string,
    status: "CONTACT" | "CONTACTED" | "CLOSED" | "UNANSWERED" | "WAITINGMEETING" | "EMAILSEND" | "WHATSAPPSEND" | "WAITINGANSERED" ,
    date_first_contact_date: string,
    source: "MAPS" | "GOOGLE" | "FB" | "INSTA" | "TIKTOK" | "WP" | "MAIL" | "CALL" | "VOIDFORM" | "ADVISE" | "LINKFOOTER" | "INPERSON" | "BUSSINESCARD",
}){
    const Name_Status = NAMES_STATUS[status] || "Other..";
    const Icon_Status = ICONS_STATUS[status] || GlobeAltIcon;
    const Color_Status = COLORS_STATUS[status] || "bg-purple-600"
    const Name_Source = NAMES_SOURCE[source] || "Other...";

    const deleteRecord = async (id:string) => {
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
            DeleteLead(id)
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
      }

    return (
        <tr className="bg-white border-bhover:bg-gray-50 border-b border-1 border-black">
            <td className="w-4 p-4 text-center">
                {numlist}
            </td>
            <td>
                <div>
                    <ul className="space-y-1">
                        <li className="flex items-center">
                            <UserCircleIcon className="w-6 h-6 text-PrimaryBg p-[2px] rounded-lg"/> <span className="ml-1">: {contac_name}</span>
                        </li>
                        <li className="flex items-center">
                            <BuildingStorefrontIcon className="w-6 h-6 text-PrimaryBg p-[2px] rounded-lg"/> <span className="ml-1">: {contact_company || "N/A"}</span>
                        </li>
                    </ul>
                </div>
            </td>
            <td>
                <div>
                    <ul className="space-y-1">
                        <li className="flex items-center">
                            <EnvelopeIcon className="w-6 h-6 text-PrimaryBg p-[2px] rounded-lg"/> <span className="ml-1">: {contact_email || "N/A"}</span>
                        </li>
                        <li className="flex items-center">
                            <PhoneIcon className="w-6 h-6 text-PrimaryBg p-[2px] rounded-lg"/> <span className="ml-1">: {contact_phone || "N/A"}</span>
                        </li>
                    </ul>
                </div>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <Icon_Status className={`w-10 h-10 text-white ${Color_Status} p-2 rounded-lg`} />
                    </div>
                    <div>
                        <p className="font-medium text-base">
                            {Name_Status}
                        </p>
                    </div>
                </div>
            </td>
            <td>
                {moment(date_first_contact_date).format("LL")}
            </td>
            <td>
                {Name_Source}
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-3">
                
                <Link href={`/dashboard/leads/${id}/view`}>
                    <EyeIcon className="w-8 h-8 bg-blue-900 text-white rounded-full p-2 transition-all duration-700 hover:bg-blue-900 cursor-pointer"/>
                </Link>
                <Link href={`/dashboard/leads/${id}/edit`}>
                    <PencilSquareIcon className="w-8 h-8 bg-green-600 text-white rounded-full p-2 transition-all duration-700 hover:bg-green-900 cursor-pointer"/>
                </Link>
                <TrashIcon onClick={()=>{deleteRecord(id)}}  className="w-8 h-8 bg-red-600 text-white rounded-full p-2 duration-700 hover:bg-red-900 cursor-pointer"/>
                </div>
            </td>
        </tr>
    )
    
}