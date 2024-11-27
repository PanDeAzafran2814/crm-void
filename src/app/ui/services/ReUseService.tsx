'use client'
import { useEffect, useState } from "react";
import { BuildingOffice2Icon, Squares2X2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { SubmitButton } from "../submit-button";
import { fetchClientsFormCreate } from "@/app/lib/suscriptions/data";
import { CreateService } from "@/app/lib/services/actions";
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


interface Client {
    id: string;
    name: string;
    contacts: Array<{ id: string; nombre: string, position: string, email: string, celular: string, telefono: string }>;
}

interface Task {
    title: string;
    desc: string;
    status: string;
    fecha: string;
}

export default function ReUseServicesForm({
    serviceData
}: {
    serviceData: Tables<'services'>
}){
    const [Tab, SetTab] = useState("info");
    const clientData = serviceData.client as unknown as ClientData

    const initialState = { message: null, status: "none", errors: {} }
    const [state, dispatch] = useFormState(CreateService, initialState)

    const [Notas, setNotas] = useState<{ nota: string; fecha: string }[]>(
        (serviceData.notes as { nota: string; fecha: string }[]) || [{ nota: '', fecha: new Date().toISOString() }]
      );
    const [Tasks, SetTaks] = useState<{ title: string; desc: string, status: string, fecha: string }[]>(
        (serviceData.tasks as { title: string; desc: string, status: string, fecha: string }[]) || [{ title: '', desc: '', status: 'NEW', fecha: new Date().toISOString() }]
      );

    const [clients, setClients] = useState<Client[]>([]);
    const [contacts, setContacts] = useState<Array<{ id: string; nombre: string, position: string, email: string, celular: string, telefono: string }>>([]);
    const [selectedClient, setSelectedClient] = useState(clientData.id || "");
    const [selectedContact, setselectedContact] = useState(serviceData.contact);

    const [amount, setamount] = useState(serviceData.amount || 0);
    const [tax, settax] = useState(serviceData.tax || 0);
    const [discount, setdiscount] = useState(serviceData.discount || 0);
    const [discount_type, setdiscount_type] = useState(serviceData.discount_type || "default");
    const [tax_calc, settax_calc] = useState(0);
    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0);

    // Calcular los cobros
    useEffect(() => {
        // Calcular el descuento según el tipo
        let discountValue = 0;
        if (discount_type === "percentaje") {
            discountValue = (amount * discount) / 100;
        } else if (discount_type === "fix") {
            discountValue = discount;
        }

        // Calcular el subtotal sin impuestos, aplicando el descuento
        const calculatedSubtotal = amount - discountValue;
        setsubtotal(calculatedSubtotal);

        // Calcular el impuesto basado en el subtotal
        const calculatedTax = (calculatedSubtotal * tax) / 100;
        settax_calc(calculatedTax);

        // Calcular el total como suma de subtotal e impuesto
        const calculatedTotal = calculatedSubtotal + calculatedTax;
        settotal(calculatedTotal);
    }, [amount, tax, discount, discount_type]);

    useEffect(() => {
        // Cargar los clientes usando fetchClientsFormCreate dentro de useEffect
        const loadClients = async () => {
            try {
                const data = await fetchClientsFormCreate(); // Espera a que los datos se resuelvan
                setClients(data || []);
            } catch (error) {
                console.error('Error al cargar clientes:', error);
            }
        };

        loadClients();
    }, []);

    useEffect(() => {
        // Actualizar contactos cuando cambie el cliente seleccionado
        const client = clients.find(c => c.id === selectedClient);
        setContacts(client ? client.contacts : []);
    }, [selectedClient, clients]);

    //Notes

    const handleAddNotes = () => {
        setNotas([...Notas, { nota: '', fecha: new Date().toISOString() }]);
    };
    
    const handleChangeNota = (index: number, value: string) => {
        const newNotas = [...Notas];
        newNotas[index].nota = value;
        newNotas[index].fecha = new Date().toISOString();
        setNotas(newNotas);
    };
    
    const handleRemoveNote = (index: number) => {
        const newNotas = Notas.filter((_, i) => i !== index);
        setNotas(newNotas);
    };

    //Tasks

    const handleAddTaks = () => {
        SetTaks([...Tasks, { title: '', desc: '', status: 'NEW', fecha: new Date().toISOString() }]);
    };
    
    const handleChangeTask = (index: number, field: keyof Task, value: string) => {
        const newTasks = [...Tasks];
        newTasks[index][field] = value;
        newTasks[index].fecha = new Date().toISOString(); // Actualiza la fecha
        SetTaks(newTasks);
    };
    
    const handleRemoveTask = (index: number) => {
        const newTasks = Tasks.filter((_, i) => i !== index);
        SetTaks(newTasks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        Notas.forEach((notaObj, index) => {
            formData.append(`notes[${index}][nota]`, notaObj.nota)
            formData.append(`notes[${index}][fecha]`, notaObj.fecha)
        });

        Tasks.forEach((taskObj, index) => {
            formData.append(`tasks[${index}][title]`, taskObj.title)
            formData.append(`tasks[${index}][desc]`, taskObj.desc)
            formData.append(`tasks[${index}][status]`, taskObj.status)
            formData.append(`tasks[${index}][fecha]`, taskObj.fecha)
        });

        await dispatch(formData);
    }

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
            <form className="w-5/6 h-[90%] bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
                <div className={`p-6 text-medium w-full h-full ${Tab === "info"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Informacion Del Servicio</h3>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona un Servicio *</label>
                            <select defaultValue={serviceData.service} id="service" name="service" className="select-basic">
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
                            {state.errors?.service &&
                                state.errors?.service.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona Un Cliente *</label>
                            <select 
                                id="client" 
                                name="client"
                                className="select-basic"
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                            >
                                <option value="default" selected>Elige Un Cliente</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                            {state.errors?.client &&
                                state.errors?.client.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona Un Contacto *</label>
                            <select 
                                id="contact"
                                name="contact" 
                                className="select-basic"
                                value={selectedContact}
                                onChange={(e)=>{setselectedContact(Number(e.target.value))}}
                            >
                                <option value="default" selected>Elige Un Contacto</option>
                                {
                                    contacts.map((contact, index) => {
                                        return(
                                            <option key={index} value={index}>{contact.nombre}</option>
                                        )
                                    })
                                }
                            </select>
                            {state.errors?.contact &&
                                state.errors?.contact.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Nombre</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{contacts[selectedContact]?.nombre || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Correo Electronico</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{contacts[selectedContact]?.email || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Position</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{contacts[selectedContact]?.position || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Celular</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{contacts[selectedContact]?.celular || "N/A"}</p>
                        </div>
                        <div className="w-1/5 space-y-1">
                            <p className="border-b border-gray-400 pb-1 text-[12px]">Telefono</p>
                            <p className="text-[13px] p-1 bg-gray-200 h-8 rounded-lg">{contacts[selectedContact]?.telefono || "N/A"}</p>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="date" 
                                    name="start_date" 
                                    defaultValue={serviceData.start_date ? new Date(serviceData.start_date).toISOString().split('T')[0] : ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Fecha Estimada de Inicio *</label>
                                {state.errors?.start_date &&
                                state.errors?.start_date.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="date" 
                                    name="finish_date" 
                                    defaultValue={serviceData.finish_date ? new Date(serviceData.finish_date).toISOString().split('T')[0] : ""}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Fecha Estimada de Terminacion *</label>
                                {state.errors?.finish_date &&
                                state.errors?.finish_date.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex space-x-3">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona un Status</label>
                            <select defaultValue={serviceData.status} id="status" name="status" className="select-basic">
                                <option value="default" selected>Elige Un Status</option>
                                <option value="NEW">Nuevo</option>
                                <option value="INPROGRESS">En Progreso</option>
                                <option value="CANCELED">Cancelado</option>
                                <option value="FIISHED">Terminado</option>
                                <option value="POSTPONED">Pospuesto</option>
                                <option value="DATECHANGE">Fecha Cambiada</option>
                            </select>
                            {state.errors?.status &&
                                state.errors?.status.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                
     

                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-full">
                            <div className="relative z-0 w-full group"> 
                                <input defaultValue={serviceData.concept || ""} type="text" name="concept" className="input-basic peer" placeholder=" "  />
                                <label className="label-basic">Concepto</label>
                                {state.errors?.concept &&
                                    state.errors?.concept.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }
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
                                    step="any"
                                    defaultValue={serviceData.amount || ""}
                                    onChange={(e) => {setamount(Number(e.target.value))}}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Cobro</label>
                                {state.errors?.charge &&
                                    state.errors?.charge.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-1/3">
                            <select id="badge" defaultValue={serviceData.badge || ""} name="badge" className="select-basic">
                                <option selected>Divisa</option>
                                <option value="mxn">MXN</option>
                                <option value="usd">USD</option>
                            </select>
                            {state.errors?.badge &&
                                state.errors?.badge.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="number" 
                                    step="any"
                                    name="tax" 
                                    defaultValue={serviceData.tax || 0}
                                    onChange={(e) => {settax(Number(e.target.value))}}
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
                                    type="number" 
                                    step="any"
                                    name="discount" 
                                    defaultValue={serviceData.discount || 0}
                                    onChange={(e) => {setdiscount(Number(e.target.value))}}
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
                                defaultValue={serviceData.discount_type || "default"}
                                onChange={(e) => {setdiscount_type(e.target.value)}}
                                className="select-basic"
                            >
                                <option selected>Tipo De Descuento</option>
                                <option value="percentaje">Porcentaje %</option>
                                <option value="fix">Fijo</option>
                            </select>
                            {state.errors?.discount_type &&
                                state.errors?.discount_type.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input 
                                    readOnly 
                                    type="number" 
                                    step="any"
                                    name="tax_calc" 
                                    value={Number(tax_calc)}
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
                                    type="number" 
                                    step="any"
                                    name="subtotal" 
                                    value={Number(subtotal)}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">SubTotal</label>
                                {state.errors?.subtotal &&
                                    state.errors?.subtotal.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }   
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input 
                                    readOnly 
                                    type="number" 
                                    step="any"
                                    name="total" 
                                    value={Number(total)}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Total</label>
                                {state.errors?.total &&
                                    state.errors?.total.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }   
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
                                            onChange={(e) => handleChangeNota(index, e.target.value)}
                                            name="notes" 
                                            rows={5} 
                                            className="input-basic peer" 
                                            placeholder=" "  
                                        />
                                        <label className="label-basic">Nota</label>
                                    </div>
                                    <div className="w-full">
                                        <button type="button" onClick={() => handleRemoveNote(index)} className="text-white bg-SecondaryBg hover:bg-PrimaryBg rounded-lg py-1 px-2 w-full">Eliminar</button>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="relative z-0 w-full group min-h-[20vh]">
                            <div 
                                onClick={handleAddNotes}
                                className="text-white bg-PrimaryBg hover:bg-SecondaryBg focus:ring-4 focus:outline-none focus:ring-PrimaryAct font-medium rounded-lg text-sm w-full h-full sm:w-auto px-5 py-2.5 text-center transition-all duration-500 cursor-pointer flex justify-center items-center">
                                    <p>Add Nota +</p>
                            </div>
                        </div>
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
                                                value={taskObj.title}
                                                onChange={(e) => handleChangeTask(index, 'title', e.target.value)}
                                                className="input-basic peer" 
                                                placeholder=" "  
                                            />
                                            <label className="label-basic">Titulo</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-1 group">
                                            <textarea 
                                                value={taskObj.desc}
                                                onChange={(e) => handleChangeTask(index, "desc", e.target.value)}
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
                                            onChange={(e) => handleChangeTask(index, "status", e.target.value)}
                                        >
                                            <option selected>Selecciona El Status</option>
                                            <option value="NEW">Nueva</option>
                                            <option value="PROGRESS">En Progreso</option>
                                            <option value="FINISHED">Terminado</option>
                                        </select>
                                        <button type="button" onClick={() => handleRemoveTask(index)} className="text-white bg-SecondaryBg hover:bg-PrimaryBg rounded-lg py-1 px-2 w-full">Eliminar</button>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="relative z-0 w-full group min-h-[20vh]">
                            <div 
                                onClick={handleAddTaks}
                                className="text-white bg-PrimaryBg hover:bg-SecondaryBg focus:ring-4 focus:outline-none focus:ring-PrimaryAct font-medium rounded-lg text-sm w-full h-full sm:w-auto px-5 py-2.5 text-center transition-all duration-500 cursor-pointer flex justify-center items-center">
                                    <p>Añadir Tarea +</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[10%] flex items-center">
                    <SubmitButton state={state.status === "error" ? "error" : "none"}/>
                    <div className="ml-2">
                        {state.message &&
                            <p className={`${state.status === "error"? "text-red-600" : "text-green-600"} text-xs`}>
                                {state.message}
                            </p>
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}