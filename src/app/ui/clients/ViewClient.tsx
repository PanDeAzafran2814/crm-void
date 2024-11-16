'use client'
import { Tables } from "@/app/lib/defintions/database"
import logovoid from "@/app/assets/images/logo.png";
import { useState } from "react"
import { BuildingOffice2Icon, DocumentDuplicateIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function ViewClient({
    clientData
}: {
    clientData: Tables<'clients'>
}){

    const [Tab, SetTab] = useState("company");

    const Contactos = (clientData.contacts as { nombre: string; email: string; position: string; celular: string; telefono: string }[]) || 
    [{ nombre: '', email: '', position: '', celular: '', telefono: '' }];
  
    const Notas = (clientData.notes as { nota: string; fecha: string }[]) || 
    [{ nota: '', fecha: new Date().toISOString() }];



    return(
        <div className="md:flex h-full">
        <ul className="flex-column w-1/6 h-full space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
            <li>
                <a onClick={()=>{SetTab("company")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "company"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                    <BuildingOffice2Icon className="w-4 h-4 me-2 "/>
                    Informacion
                </a>
            </li>
            <li>
                <a onClick={()=>{SetTab("contacs")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "contacs"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                    <UserCircleIcon className="w-4 h-4 me-2"/>
                    Contactos
                </a>
            </li>
            <li>
                <a onClick={()=>{SetTab("notes")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "notes"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                    <BuildingOffice2Icon className="w-4 h-4 me-2"/>
                    Notas
                </a>
            </li>
            <li>
                <a onClick={()=>{SetTab("services")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "services"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                    <UserGroupIcon className="w-4 h-4 me-2"/>
                    Servicios
                </a>
            </li>
            <li>
                <a onClick={()=>{SetTab("invoices")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "invoices"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                    <DocumentDuplicateIcon className="w-4 h-4 me-2"/>
                    Facturas
                </a>
            </li>
        
        </ul>
        <div className="w-5/6 h-[90%] bg-gray-100 rounded-lg">
            <div className={`p-6 text-medium w-full h-full ${Tab === "company"? "" : "hidden"}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Informacion De La Empresa</h3>
                <div className="mt-5 flex space-x-3">
                    <div className="w-1/3">
                        <div className="relative z-0 w-full group">
                            <input readOnly defaultValue={clientData.name} type="text" name="name" className="input-basic peer" placeholder=" "  />
                            <label className="label-basic">Nombre *</label>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="relative z-0 w-full group">
                            <input readOnly defaultValue={clientData.contact_email} type="text" name="contact_email" className="input-basic peer" placeholder=" " />
                            <label className="label-basic">Correo Electronico *</label>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="relative z-0 w-full group">
                            <input readOnly defaultValue={clientData.contact_phone || ""} type="text" name="contact_phone" className="input-basic peer" placeholder=" " />
                            <label className="label-basic">Telefono</label>
                        </div>
                    </div>
                </div>
                {/****/}
                <div className="mt-5 flex space-x-3">
                    <div className="w-4/12">
                        <div className="relative z-0 w-full group">
                            <input readOnly defaultValue={clientData.contact_address || ""} type="text" name="contact_address" className="input-basic peer" placeholder=" "  />
                            <label className="label-basic">Dirreccion</label>
                        </div>
                    </div>
                    <div className="w-3/12">
                        <div className="relative z-0 w-full group">
                            <input readOnly defaultValue={clientData.contact_city || ""} type="text" name="contact_city" className="input-basic peer" placeholder=" " />
                            <label className="label-basic">Ciudad *</label>
                        </div>
                    </div>
                    <div className="w-3/12">
                        <div className="relative z-0 w-full group">
                            <input readOnly defaultValue={clientData.contact_state || ""} type="text" name="contact_state" className="input-basic peer" placeholder=" " />
                            <label className="label-basic">Estado</label>
                        </div>
                    </div>
                    <div className="w-2/12">
                        <div className="relative z-0 w-full group">
                            <input readOnly defaultValue={clientData.contact_zip || ""} type="text" name="contact_zip" className="input-basic peer" placeholder=" " />
                            <label className="label-basic">Codigo Postal</label>
                        </div>
                    </div>
                </div>
                {/****/}
                <div className="mt-5 flex items-center space-x-3">
                    <div className="flex items-center w-1/3">
                        <div className="shrink-0">
                            <img 
                                width={26}
                                height={26}
                                className="h-32 w-32 object-cover rounded-full" 
                                src={clientData.client_logo || logovoid.src} 
                                alt="Company Logo" />
                        </div>
                        <label className="block">
                        </label>
                    </div>
                    <div className="w-1/3">
                        <div className="relative z-0 w-full mb-5 group">
                            <input readOnly defaultValue={clientData.association_date ? new Date(clientData.association_date).toISOString().split('T')[0] : ""}  type="date" name="association_date" className="input-basic peer" placeholder=" "  />
                            <label className="label-basic">Fecha De Asociacion</label>
                        </div>
                    </div>
                    <div className="w-1/3 flex justify-center items-center">
                        <div className="relative z-0 mb-5 group">                
                            <label className="inline-flex items-center cursor-pointer">
                                <input disabled type="checkbox" defaultChecked={clientData.enable} name="enable" value="true" className="sr-only peer"/>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 ">Es Cliente Activo?</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`p-6 text-medium w-full h-full ${Tab === "contacs"? "" : "hidden"}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Contactos</h3>
                <div>
                    {
                        Contactos.map((contact, index) => (
                            <div key={index} className="flex space-x-3 mb-5">
                                <div className="w-1/5">
                                    <div className="relative z-0 w-full group">
                                        <input readOnly type="text" value={contact.nombre} className="input-basic peer" placeholder=" "  />
                                        <label className="label-basic">Nombre *</label>
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="relative z-0 w-full group">
                                        <input readOnly type="text" value={contact.email} className="input-basic peer" placeholder=" "  />
                                        <label className="label-basic">Correo Electronico *</label>
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="relative z-0 w-full group">
                                        <input readOnly type="text" value={contact.position} className="input-basic peer" placeholder=" "  />
                                        <label className="label-basic">Position *</label>
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="relative z-0 w-full group">
                                        <input readOnly type="text" value={contact.celular} className="input-basic peer" placeholder=" "  />
                                        <label className="label-basic">Celular</label>
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <div className="relative z-0 w-full group">
                                        <input readOnly type="text" value={contact.telefono} className="input-basic peer" placeholder=" "  />
                                        <label className="label-basic">Telefono</label>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={`p-6 text-medium w-full h-full overflow-y-auto ${Tab === "notes"? "" : "hidden"}`}>
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
            <div className={`p-6 text-medium w-full h-full ${Tab === "services"? "" : "hidden"}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Servicios</h3>
            </div>
            <div className={`p-6 text-medium w-full h-full ${Tab === "invoices"? "" : "hidden"}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Facturas</h3>
            </div>
        </div>
    </div>
    )
}  