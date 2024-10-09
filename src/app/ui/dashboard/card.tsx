import {
    DocumentDuplicateIcon,
    WalletIcon,
    ServerStackIcon,
    UserGroupIcon,
    ArrowUpRightIcon,
    ArrowDownLeftIcon,
  } from "@heroicons/react/24/outline";
  
  const ICONS = {
    invoices: DocumentDuplicateIcon,
    bills: WalletIcon,
    status: ServerStackIcon,
    clients: UserGroupIcon,
  };
  
  const TITTLES = {
    invoices: "Facturas",
    bills: "Gastos",
    status: "Status",
    clients: "Clientes",
  };
  
  const STYLES = {
    invoices: {
      bg: "bg-SalesCardBg",
      primary: "bg-SalesCardPrimary",
      text: "text-SalesCardTxt",
    },
    bills: {
      bg: "bg-BillsCardBg",
      primary: "bg-BillsCardPrimary",
      text: "text-BillsCardTxt",
    },
    status: {
      bg: "bg-StatusCardBg",
      primary: "bg-StatusCardPrimary",
      text: "text-StatusCardTxt",
    },
    clients: {
      bg: "bg-ClientsCardBg",
      primary: "bg-ClientsCardPrimary",
      text: "text-ClientsCardTxt",
    },
  };
  
  export default function Card({
    type,
    NumericOrCurrency,
    total,
    totalEnabled,
    totalDisabled,
    percentEnabled,
    percentDisabled
  }: {
    type: "invoices" | "bills" | "status" | "clients";
    NumericOrCurrency: "Number" | "Currency",
    total:number
    totalEnabled:number,
    totalDisabled:number,
    percentEnabled:number,
    percentDisabled:number
  }) {
    const Icon = ICONS[type] || DocumentDuplicateIcon;
    const Tittle = TITTLES[type] || "Registos";
    const Style = STYLES[type] || STYLES["invoices"];
  
    return (
      <div className={`${Style.bg} w-[24%] p-8 space-y-4 rounded-lg`}>
        <div className="flex justify-between items-center">
          <div>
            <Icon
              className={`${Style.primary} ${Style.text} p-2 max-2xl:w-8 max-2xl:h-8 w-10 h-10 rounded-full`}
            />
          </div>
          <div>
            <p className={`${Style.text}  max-2xl:text-sm font-medium`}>
              {
                totalEnabled >= totalDisabled?
                `+${percentEnabled}%`
                :
                `-${percentDisabled}%` 
              }
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold max-2xl:text-base text-xl">
            {
              NumericOrCurrency === "Currency" ?
              `$ 00,000.00`
              :
              `${total}`
            }
          </p>
          <div className="flex items-center justify-between">
            <p className="xl:text-sm text-base">Total {Tittle}</p>
            <div className="flex items-center space-x-1">
              {
                totalEnabled >= totalDisabled ?
                <ArrowUpRightIcon className="w-5 h-5 bg-GreenPlusBg text-GreenPlusTxt p-1 rounded-full" />
                :
                <ArrowDownLeftIcon className="w-5 h-5 bg-RebDangerBg text-RebDangerTxt p-1 rounded-full" />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }