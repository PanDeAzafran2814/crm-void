'use client'
import {
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import logovoid from "@/app/assets/images/logo-black.png";
import Swal from "sweetalert2";
//import { DeleteClient } from "@/app/lib/actions";

export default function ClientTableItem({
  id,
  numlist,
  logo,
  name,
  contact_name,
  enable,
  location
}:{
  id:string,
  numlist:number,
  logo:string,
  name:string,
  contact_name:string,
  enable:boolean,
  location:string
}) {

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
        //DeleteClient(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <tr className="bg-white border-bhover:bg-gray-50">
      <td className="w-4 p-4 text-center">
        {numlist}
      </td>
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
      >
        <img
          width={40}
          height={40}
          className="rounded-full"
          src={logo ? logo : logovoid.src}
          
          alt="Company Image"
        />
        <div className="ps-3">
          <div className="text-base font-semibold">{name}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        {contact_name}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full me-2 ${enable? 'bg-green-500' : 'bg-red-500'}`}></div>{" "}
          {
            enable?
            "Activo"
            :
            "Inactivo"
          }
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-3">
        <Link href={`/dashboard/clients/${id}/edit`}>
          <PencilSquareIcon className="w-8 h-8 bg-green-600 text-white rounded-full p-2 transition-all duration-700 hover:bg-green-900 cursor-pointer"/>
        </Link>
        {
          location !== "dashboard" ?
          <TrashIcon onClick={()=>{deleteRecord(id)}}  className="w-8 h-8 bg-red-600 text-white rounded-full p-2 duration-700 hover:bg-red-900 cursor-pointer"/>
          :null
        }
        </div>
      </td>
    </tr>
  );
}