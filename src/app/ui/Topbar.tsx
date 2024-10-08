"use client";
import {
  ChevronDownIcon,
  BellSlashIcon,
} from "@heroicons/react/24/outline";
import MenuUser from "./dropdown";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Search from "./search";

export default function TopBar() {
  /*const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Clientes", href: "/dashboard/clients" },
    { name: "Servicios", href: "/dashboard/services" },
    {
      name: "Facturas",
      href: "/dashboard/invoices",
    },
    { name: "Gastos", href: "/dashboard/bills" },
    { name: "Status", href: "/dashboard/status" },
    {
      name: "Credenciales",
      href: "/dashboard/credentials",
    },
  ];
  */

  const TITTLES: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/dashboard/clients": "Clientes",
    "/dashboard/clients/create": "Cliente Nuevo",
    "/dashboard/services": "Servicios",
    "/dashboard/invoices": "Facturas",
    "/dashboard/bills": "Gastos",
    "/dashboard/status": "Status",
    "/dashboard/credentials": "Credenciales",
  };

  const [OpenUserMenu, SetOpenUserMenu] = useState(false);
  const pathname = usePathname();
  const Title = TITTLES[pathname] || "Pagina";
  return (
    <div className="flex py-5 px-5 border-b border-gray-300 relative z-[999]">
      <div className="w-[20%]">
        <p className="max-2xl:text-xl text-2xl font-medium">{Title}</p>
      </div>
      <div className="w-[60%] flex justify-center">
        <Search placeholder="Search Anything..."/>
      </div>
      <div className="w-[20%] flex justify-end items-center space-x-4">
        <div className="border border-gray-400 rounded-full p-1">
          <BellSlashIcon className="w-5 h-5 text-black" />
        </div>
        <div 
          className="flex items-center space-x-1 border border-gray-400 rounded-full px-4 py-1 cursor-pointer"
          onClick={() => {
            SetOpenUserMenu(!OpenUserMenu);
          }}
        >
          <p className="max-2xl:text-xs">Hola, Francisco Orta</p>
          <ChevronDownIcon
            className="w-5 h-5 text-black"
          />
          {OpenUserMenu ? <MenuUser /> : null}
        </div>
      </div>
    </div>
  );
}