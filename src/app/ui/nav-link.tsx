"use client";
import {
  UserGroupIcon,
  Squares2X2Icon,
  DocumentDuplicateIcon,
  FingerPrintIcon,
  ServerStackIcon,
  CircleStackIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  { name: "Clientes", href: "/dashboard/clients", icon: UserGroupIcon },
  { name: "Servicios", href: "/dashboard/services", icon: CircleStackIcon },
  {
    name: "Facturas",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Gastos", href: "/dashboard/bills", icon: WalletIcon },
  { name: "Status", href: "/dashboard/status", icon: ServerStackIcon },
  {
    name: "Credenciales",
    href: "/dashboard/credentials",
    icon: FingerPrintIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <li key={link.name}>
            <Link href={link.href}>
              <div
                className={`flex items-center text-white space-x-3 max-2xl:p-3 p-4 rounded-full w-full transition-all duration-700 cursor-pointer ${
                  pathname === link.href
                    ? "bg-PrimaryAct hover:bg-white hover:text-black"
                    : "hover:bg-PrimaryAct"
                }`}
              >
                <LinkIcon className="w-5 h-5 max-2xl:h-4 max-2xl:w-4" />
                <p className="max-2xl:text-[16px] text-[18px] tracking-widest bold font-light">
                  {link.name}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}