'use client'
import { useEffect, useState } from "react";
import { BuildingOffice2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { UpdateSuscription } from "@/app/lib/suscriptions/actions";
import { SubmitButton } from "../submit-button";
import { fetchClientsFormCreate } from "@/app/lib/suscriptions/data";
import moment from "moment";
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

export default function EditSuscriptionForm({
    suscripcionData
}:{
    suscripcionData: Tables<'suscriptions'>
}){
    const [Tab, SetTab] = useState("info");
    const clientData = suscripcionData.client as unknown as ClientData;

    const initialState = { message: null, status: "none", errors: {} }
    const UpdateSuscriptionWithId = UpdateSuscription.bind(null, suscripcionData.id)
    const [state, dispatch] = useFormState(UpdateSuscriptionWithId, initialState)

    const [Notas, setNotas] = useState<{ nota: string; fecha: string }[]>(
        (suscripcionData.notes as { nota: string; fecha: string }[]) || [{ nota: '', fecha: new Date().toISOString() }]
      );    const [clients, setClients] = useState<Client[]>([]);
    const [contacts, setContacts] = useState<Array<{ id: string; nombre: string, position: string, email: string, celular: string, telefono: string }>>([]);
    const [selectedClient, setSelectedClient] = useState(clientData.id || "");
    const [selectedContact, setselectedContact] = useState(suscripcionData.contact);

    const [form_date, setform_date] = useState(suscripcionData.form_date ? new Date(suscripcionData.form_date).toISOString().split('T')[0] : "");
    const [each, seteach] = useState(suscripcionData.each || 0);
    const [each_type, seteach_type] = useState(suscripcionData.each_type || "");
    const [renovation_date, setrenovation_date] = useState("default");
    type EachType = "days" | "weeks" | "months" | "years";

    const [amount, setamount] = useState(suscripcionData.amount || 0);
    const [tax, settax] = useState(suscripcionData.tax || 0);
    const [discount, setdiscount] = useState(suscripcionData.discount || 0);
    const [discount_type, setdiscount_type] = useState(suscripcionData.discount_type || "default");
    const [tax_calc, settax_calc] = useState(0);
    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0);

    
    //Generacion de la fecha de renovacion
    useEffect(() => {
        console.log({form_date,each,each_type})
        if (each > 0 && each_type !== "default" && form_date !==""){
            if (["days", "weeks", "months", "years"].includes(each_type)) {
                const newDate = moment(form_date).add(each, each_type as EachType).format("YYYY-MM-DD");
                setrenovation_date(newDate);
                console.log(newDate)
            }
        }else{
            setrenovation_date("")
        }
    },[each,each_type, form_date])

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        Notas.forEach((notaObj, index) => {
            formData.append(`notes[${index}][nota]`, notaObj.nota)
            formData.append(`notes[${index}][fecha]`, notaObj.fecha)
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
                    <a onClick={()=>{SetTab("notes")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "notes"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                        <UserCircleIcon className="w-4 h-4 me-2"/>
                        Notas
                    </a>
                </li>
            </ul>
            <form className="w-5/6 h-[90%] bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
                <div className={`p-6 text-medium w-full h-full ${Tab === "info"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Informacion De la Suscripcion</h3>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona un Servicio</label>
                            <select defaultValue={suscripcionData.service} id="service" name="service" className="select-basic">
                                <option value="default" selected>Elige Un Servicio</option>
                                <option value="HOST">Hosting</option>
                                <option value="DOM">Dominio</option>
                                <option value="SSL">SSL</option>
                                <option value="SUP">Soporte</option>
                                <option value="Email">Correo</option>
                                <option value="CRM">CRM</option>
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
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona Un Cliente</label>
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
                            <label className="block mb-2 text-sm font-medium text-gray-900">Selecciona Un Contacto</label>
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
                        <div className="w-full">
                            <div className="relative z-0 w-full group">
                                <input 
                                    type="date" 
                                    name="form_date" 
                                    defaultValue={suscripcionData.form_date ? new Date(suscripcionData.form_date).toISOString().split('T')[0] : ""}
                                    onChange={(e) =>{setform_date(e.target.value)} }
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
                                    defaultValue={suscripcionData.each || ""}
                                    onChange={(e) => {seteach(Number(e.target.value))}}
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
                                defaultValue={suscripcionData.each_type || ""}
                                onChange={(e) => {seteach_type(e.target.value)}}
                                className="select-basic"
                            >
                                <option value="default" selected>Elige Cada Cuanto Tiempo</option>
                                <option value="days">Dias</option>
                                <option value="weeks">Semanas</option>
                                <option value="months">Meses</option>
                                <option value="years">Años</option>
                            </select>
                            {state.errors?.each_type &&
                                state.errors?.each_type.map((error: string) =>(
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
                                    type="date" 
                                    name="renovation_date" 
                                    value={renovation_date}
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Fecha De Renovacion</label>
                                {state.errors?.renovation_date &&
                                    state.errors?.renovation_date.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="w-full">
                            <div className="relative z-0 w-full group"> 
                                <input type="text" defaultValue={suscripcionData.concept || ""} name="concept" className="input-basic peer" placeholder=" "  />
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
                                    defaultValue={suscripcionData.amount || ""}
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
                            <select id="badge" defaultValue={suscripcionData.badge || ""} name="badge" className="select-basic">
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
                                    name="tax" 
                                    defaultValue={suscripcionData.tax || 0}
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
                                    name="discount" 
                                    defaultValue={suscripcionData.discount || 0}
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
                                defaultValue={suscripcionData.discount_type || ""}
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
                                    type="text" 
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
                                className="btn-add-notes">
                                    <p>Add Nota +</p>
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