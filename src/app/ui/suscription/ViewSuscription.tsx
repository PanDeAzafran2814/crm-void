'use client'

import { Tables } from "@/app/lib/defintions/database"
import { useState } from "react";
import { BuildingOffice2Icon, UserCircleIcon } from "@heroicons/react/24/outline";

interface ClientData {
    id: string,
    name: string,
    contacts: {
      [contactId: string]: {
        nombre: string;
        email: string;
        position: string;
        celular: string;
        telefono: string;
      };
    };
  }

export default function ViewSuscription({
    suscripcionData
}: {
    suscripcionData: Tables<'suscriptions'>;
}){

    const [Tab, SetTab] = useState("info");
    const clientData = suscripcionData.client as unknown as ClientData;

    const Notas = (suscripcionData.notes as { nota: string; fecha: string }[]) || 
    [{ nota: '', fecha: new Date().toISOString() }];

    console.log(suscripcionData.tax)

    return (
        <div className="md:flex h-full">
            <ul className="flex-column w-1/6 h-full space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                <li>
                    <a onClick={()=>{SetTab("info")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "info"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                        <BuildingOffice2Icon className="w-4 h-4 me-2 "/>
                        Informacion
                    </a>
                </li>
                <li>
                    <a onClick={()=>{SetTab("costs")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "costs"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                        <UserCircleIcon className="w-4 h-4 me-2"/>
                        Costos
                    </a>
                </li>
                <li>
                    <a onClick={()=>{SetTab("notes")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "notes"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                        <UserCircleIcon className="w-4 h-4 me-2"/>
                        Notas
                    </a>
                </li>
            </ul>
            <form className="w-5/6 h-[90%] bg-gray-100 rounded-lg">
                <div className={`p-6 text-medium w-full h-full ${Tab === "info"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Informacion De la Suscripcion</h3>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Servicio</label>
                            <select value={suscripcionData.service} disabled id="service" name="service" className="select-basic">
                                <option value="default" selected>Elige Un Servicio</option>
                                <option value="HOST">Hosting</option>
                                <option value="DOM">Dominio</option>
                                <option value="SSL">SSL</option>
                                <option value="SUP">Soporte</option>
                                <option value="Email">Correo</option>
                                <option value="CRM">CRM</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Cliente</label>
                            <input 
                                type="text" 
                                name="client"
                                value={clientData.name} 
                                className="input-basic peer" 
                                placeholder=" "  
                            />
                            
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Contacto</label>
                            <input 
                                type="text" 
                                name="contact"
                                value={clientData.contacts[suscripcionData.contact]?.nombre || "N/A"} 
                                className="input-basic peer" 
                                placeholder=" "  
                            />
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Nombre</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[suscripcionData.contact]?.nombre || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Correo Electronico</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[suscripcionData.contact]?.email || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Position</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[suscripcionData.contact]?.position || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Celular</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[suscripcionData.contact]?.celular || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Telefono</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[suscripcionData.contact]?.telefono || "N/A"}</p>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-full">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="date" 
                                    name="form_date" 
                                    defaultValue={suscripcionData.form_date? new Date(suscripcionData.form_date).toISOString().split('T')[0] : ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Desde</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="number" 
                                    name="each" 
                                    readOnly
                                    value={suscripcionData.each || ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Cada</label>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select 
                                id="each_type" 
                                name="each_type"
                                disabled
                                value={suscripcionData.each_type || ""} 
                                className="select-basic"
                            >
                                <option value="default" selected>Elige Cada Cuanto Tiempo</option>
                                <option value="days">Dias</option>
                                <option value="weeks">Semanas</option>
                                <option value="months">Meses</option>
                                <option value="years">Años</option>
                            </select>
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="date" 
                                    name="renovation_date" 
                                    defaultValue={suscripcionData.renewal_date? new Date(suscripcionData.renewal_date).toISOString().split('T')[0] : ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Fecha De Renovacion</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-full">
                            <div className="relative z-0 w-full group"> 
                                <input value={suscripcionData.concept || ""} readOnly type="text" name="concept" className="input-basic peer" placeholder=" "  />
                                <label className="label-basic">Concepto</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`p-6 text-medium w-full h-full ${Tab === "costs"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Cobros</h3>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="number" 
                                    name="charge" 
                                    readOnly
                                    value={suscripcionData.amount || ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Cobro</label>
                                
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select id="badge" disabled value={suscripcionData.badge || ""} name="badge" className="select-basic">
                                <option selected>Divisa</option>
                                <option value="mxn">MXN</option>
                                <option value="usd">USD</option>
                            </select>
                            
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="text" 
                                    name="tax" 
                                    readOnly
                                    value={suscripcionData.tax || "0"}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Impuesto %</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="text" 
                                    name="discount" 
                                    readOnly
                                    value={suscripcionData.discount || "0"}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Descuento</label>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select 
                                id="discount_type" 
                                name="discount_type"
                                disabled
                                value={suscripcionData.discount_type || "0"}
                                className="select-basic"
                            >
                                <option selected>Tipo De Descuento</option>
                                <option value="percentaje">Porcentaje %</option>
                                <option value="fix">Fijo</option>
                            </select>
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    readOnly 
                                    type="text" 
                                    name="tax_calc" 
                                    value={suscripcionData.tax_calc || "0"}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Calculo de impuesto</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    readOnly 
                                    type="text" 
                                    name="subtotal" 
                                    value={suscripcionData.subtotal || "0"}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">SubTotal</label>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    readOnly 
                                    type="text" 
                                    name="total" 
                                    value={suscripcionData.total || "0"}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Total</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`p-6 text-medium w-full h-full ${Tab === "notes"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Notas</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            Notas.map((notaObj, index) =>(
                                <div key={index}>
                                    <div className="relative z-0 w-full mb-1 group">
                                        <textarea 
                                            value={notaObj.nota}
                                            readOnly
                                            name="notes" 
                                            rows={5} 
                                            className="input-basic peer" 
                                            placeholder=" "  
                                        />
                                        <label className="label-basic">Nota</label>
                                    </div>
                                    
                                </div>
                            ))
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}