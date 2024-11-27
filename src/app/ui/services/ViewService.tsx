'use client'
import { useState } from "react";
import { BuildingOffice2Icon, Squares2X2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Tables } from "@/app/lib/defintions/database";

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

export default function ViewService({
    serviceData
}: {
    serviceData: Tables<'services'>
}){
    const [Tab, SetTab] = useState("info");
    const clientData = serviceData.client as unknown as ClientData;

    const Notas = (serviceData.notes as { nota: string; fecha: string }[]) || 
    [{ nota: '', fecha: new Date().toISOString() }];

    const Tasks = (serviceData.tasks as { title: string, desc: string, status: string, fecha: string}[]) ||
    [{ title: '', desc: '', status: 'NEW', fecha: new Date().toISOString() }]

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
                    <a onClick={()=>{SetTab("tasks")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "tasks"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                        <Squares2X2Icon className="w-4 h-4 me-2"/>
                        Tareas
                    </a>
                </li>
                <li>
                    <a onClick={()=>{SetTab("notes")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "notes"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                        <UserCircleIcon className="w-4 h-4 me-2"/>
                        Notas
                    </a>
                </li>
            </ul>
            <div className="w-5/6 h-[90%] bg-gray-100 rounded-lg">
                <div className={`p-6 text-medium w-full h-full ${Tab === "info"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Informacion Del Servicio</h3>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona un Servicio *</label>
                            <select value={serviceData.service} disabled id="service" name="service" className="select-basic">
                                <option value="default" selected>Elige Un Servicio</option>
                                <option value="SUPPORT">Soporte</option>
                                <optgroup label="Web">
                                    <option value="WDEV">Desarrollo Web</option>
                                    <option value="WDESING">Diseño Web</option>
                                    <option value="CHANGESWEB">Cambios En Sitio Web</option>
                                    <option value="EXPORWEB">Migracion De Sitio Web</option>
                                    <option value="UPWEB">Actualizacion De Sitio Web</option>
                                </optgroup>
                                <optgroup label="App Movil">
                                    <option value="APPDEV">Desarrollo App Movil</option>
                                    <option value="APPDESING">Diseño App Movil</option>
                                    <option value="CHANGESAPP">Cambios En APP Movil</option>
                                    <option value="UPAPP">Actualizacion De App Movil</option>
                                </optgroup>
                                <optgroup label="Diseño Grafico">
                                    <option value="BRANDING">Branding</option>
                                    <option value="LOGODESING">Diseño De Logo</option>
                                    <option value="INDESING">Diseño Individual</option>
                                </optgroup>
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
                                value={clientData.contacts[serviceData.contact]?.nombre || "N/A"} 
                                className="input-basic peer" 
                                placeholder=" "  
                            />
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Nombre</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[serviceData.contact]?.nombre || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Correo Electronico</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[serviceData.contact]?.email || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Position</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[serviceData.contact]?.position || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Celular</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[serviceData.contact]?.celular || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Telefono</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{clientData.contacts[serviceData.contact]?.telefono || "N/A"}</p>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="date" 
                                    name="start_date" 
                                    defaultValue={serviceData.start_date? new Date(serviceData.start_date).toISOString().split('T')[0] : ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Fecha Estimada de Inicio *</label>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="date" 
                                    name="finish_date" 
                                    defaultValue={serviceData.finish_date? new Date(serviceData.finish_date).toISOString().split('T')[0] : ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Fecha Estimada de Terminacion *</label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex space-x-3">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona un Status</label>
                            <select value={serviceData.status} disabled id="status" name="status" className="select-basic">
                                <option value="default" selected>Elige Un Status</option>
                                <option value="NEW">Nuevo</option>
                                <option value="INPROGRESS">En Progreso</option>
                                <option value="CANCELED">Cancelado</option>
                                <option value="FIISHED">Terminado</option>
                                <option value="POSTPONED">Pospuesto</option>
                                <option value="DATECHANGE">Fecha Cambiada</option>
                            </select>
                        </div>
                    </div>
                
     

                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-full">
                            <div className="relative z-0 w-full group"> 
                                <input value={serviceData.concept || ""} readOnly type="text" name="concept" className="input-basic peer" placeholder=" "  />
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
                                    type="text" 
                                    readOnly
                                    value={serviceData.amount || "0"}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Cobro</label>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select value={serviceData.badge || ""} disabled id="badge" name="badge" className="select-basic">
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
                                    value={serviceData.tax || "0"}
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
                                    value={serviceData.discount || "0"}
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
                                value={serviceData.discount_type || "0"}
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
                                    value={serviceData.tax_calc || "0"}
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
                                    value={serviceData.subtotal || "0"}
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
                                    value={serviceData.total || "0"}
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
                <div className={`p-6 text-medium w-full h-full overflow-y-auto ${Tab === "tasks"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tareas</h3>
                    <div className="flex flex-col">
                        {
                            Tasks.map((taskObj, index) =>(
                                <div key={index} className="flex border-t border-gray-500 py-4">
                                    <div className="w-[80%] space-y-4">
                                        <div className="relative z-0 w-full group">
                                            <input 
                                                type="text" 
                                                name="task-title" 
                                                readOnly
                                                value={taskObj.title}
                                                className="input-basic peer" 
                                                placeholder=" "  
                                            />
                                            <label className="label-basic">Titulo</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-1 group">
                                            <textarea 
                                                value={taskObj.desc}
                                                readOnly
                                                name="notes" 
                                                rows={5} 
                                                className="input-basic peer" 
                                                placeholder=" "  
                                            />
                                            <label className="label-basic">Descripcion</label>
                                        </div>
                                    </div>
                                    <div className="w-[20%] pl-2 space-y-3 flex flex-col justify-center">
                                        <select 
                                            id="task-status" 
                                            name="task-status" 
                                            className="select-basic"
                                            value={taskObj.status}
                                            disabled
                                        >
                                            <option selected>Selecciona El Status</option>
                                            <option value="NEW">Nueva</option>
                                            <option value="PROGRESS">En Progreso</option>
                                            <option value="FINISHED">Terminado</option>
                                        </select>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}