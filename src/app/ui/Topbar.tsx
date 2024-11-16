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

  type TitleConfig = string | {
    default: string;
    create?: string;
    edit?: string;
    view?: string;
    [key: string]: string | undefined; // Para admitir otras posibles acciones dinámicas
  };  

  const TITTLES: { [key: string]: TitleConfig  } = {
    "/dashboard": "Dashboard",
    "/dashboard/clients": {
      default: "Clientes",
      create: "Cliente Nuevo",
      edit: "Editar Cliente",
      view: "Ver Cliente",
    },
    "/dashboard/services": {
      default: "Servicios",
      create: "Servicio Nueva",
      edit: "Editar Servicio",
      view: "Ver Servicio",
    },
    "/dashboard/suscription": {
      default: "Suscripciones",
      create: "Suscripcion Nueva",
      edit: "Editar Suscripcion",
      view: "Ver Suscripcion",
      renewal: "Renovar Suscripcion",
    },
    "/dashboard/leads": {
      default: "Leads",
      create: "Lead Nuevo",
      edit: "Editar Lead",
      view: "Ver Lead",
    },
    "/dashboard/invoices": "Facturas",
    "/dashboard/bills": "Gastos",
    "/dashboard/status": "Status",
    "/dashboard/credentials": "Credenciales",
  };

  const getTitle = (pathname: string): string => {
    // Dividimos el pathname en partes
    const pathParts = pathname.split("/").filter(Boolean); // Filtra partes vacías
    const [rootPath, section, idOrAction, action] = pathParts;

    // Construimos la ruta base (ejemplo: "/dashboard/clients")
    const basePath = `/${rootPath}/${section}`;
    // Buscamos el título basado en la ruta base
    const sectionConfig = TITTLES[basePath];

    // Si es una cadena, es un título directo (sin subrutas)
    if (typeof sectionConfig === "string") {
      return sectionConfig;
    }

    // Si tiene subrutas, verificamos si la tercera parte es un ID o una acción
    if (sectionConfig) {
      // Si hay una acción explícita como "edit" o "view"
      if (action && sectionConfig[action]) {
        return sectionConfig[action];
      }

      // Si la tercera parte es "create", consideramos que es una subruta válida
      if (idOrAction && sectionConfig[idOrAction]) {
        return sectionConfig[idOrAction];
      }

      // Si no hay acción explícita, usamos el título por defecto
      return sectionConfig.default || "Pagina";
    }

    // Si no hay coincidencia, devolvemos un valor por defecto
    return "Pagina";
  };

  const [OpenUserMenu, SetOpenUserMenu] = useState(false);
  const pathname = usePathname();
  const Title = getTitle(pathname);
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