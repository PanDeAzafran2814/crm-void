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
                            <select value={suscripcionData.service} disabled id="service" name="service" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                placeholder=" "  
                            />
                            
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Contacto</label>
                            <input 
                                type="text" 
                                name="contact"
                                value={clientData.contacts[suscripcionData.contact]?.nombre || "N/A"} 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Desde</label>
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cada</label>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select 
                                id="each_type" 
                                name="each_type"
                                disabled
                                value={suscripcionData.each_type || ""} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha De Renovacion</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-full">
                            <div className="relative z-0 w-full group"> 
                                <input value={suscripcionData.concept || ""} readOnly type="text" name="concept" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Concepto</label>
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cobro</label>
                                
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select id="badge" disabled value={suscripcionData.badge || ""} name="badge" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Impuesto %</label>
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descuento</label>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select 
                                id="discount_type" 
                                name="discount_type"
                                disabled
                                value={suscripcionData.discount_type || "0"}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Calculo de impuesto</label>
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">SubTotal</label>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    readOnly 
                                    type="text" 
                                    name="total" 
                                    value={suscripcionData.total || "0"}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total</label>
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
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                            placeholder=" "  
                                        />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nota</label>
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