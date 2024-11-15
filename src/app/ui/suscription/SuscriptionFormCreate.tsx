'use client'
import { useEffect, useState } from "react";
import { BuildingOffice2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { createSuscription } from "@/app/lib/suscriptions/actions";
import { SubmitButton } from "../submit-button";
import { fetchClientsFormCreate } from "@/app/lib/suscriptions/data";
import moment from "moment";

interface Client {
    id: string;
    name: string;
    contacts: Array<{ id: string; nombre: string, position: string, email: string, celular: string, telefono: string }>;
}

export default function SuscriptionFormCreate(){
    const [Tab, SetTab] = useState("info");
    const initialState = { message: null, status: "none", errors: {} }
    const [state, dispatch] = useFormState(createSuscription, initialState)
    const [Notas, setNotas] = useState([{ nota: '', fecha: new Date().toISOString() }]);
    const [clients, setClients] = useState<Client[]>([]);
    const [contacts, setContacts] = useState<Array<{ id: string; nombre: string, position: string, email: string, celular: string, telefono: string }>>([]);
    const [selectedClient, setSelectedClient] = useState<string>('default');
    const [selectedContact, setselectedContact] = useState(0);

    const [form_date, setform_date] = useState("");
    const [each, seteach] = useState(0);
    const [each_type, seteach_type] = useState("");
    const [renovation_date, setrenovation_date] = useState("00-00-00");
    type EachType = "days" | "weeks" | "months" | "years";

    const [amount, setamount] = useState(0);
    const [tax, settax] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [discount_type, setdiscount_type] = useState("");
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
            setrenovation_date("00-00-000")
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
        console.log("ey1")
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        Notas.forEach((notaObj, index) => {
            formData.append(`notes[${index}][nota]`, notaObj.nota)
            formData.append(`notes[${index}][fecha]`, notaObj.fecha)
        });

        await dispatch(formData);
    }

    console.log(state)

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
                            <select id="service" name="service" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                    onChange={(e) =>{setform_date(e.target.value)} }
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
                                    onChange={(e) => {seteach(Number(e.target.value))}}
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
                                onChange={(e) => {seteach_type(e.target.value)}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha De Renovacion</label>
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
                                <input type="text" name="concept" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Concepto</label>
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
                                    onChange={(e) => {setamount(Number(e.target.value))}}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cobro</label>
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
                            <select id="badge" name="badge" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                                    onChange={(e) => {settax(Number(e.target.value))}}
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
                                    type="number" 
                                    step="any"
                                    name="discount" 
                                    onChange={(e) => {setdiscount(Number(e.target.value))}}
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
                                onChange={(e) => {setdiscount_type(e.target.value)}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                    type="number" 
                                    step="any"
                                    name="subtotal" 
                                    value={Number(subtotal)}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">SubTotal</label>
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                    placeholder=" "  
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Total</label>
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
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" 
                                            placeholder=" "  
                                        />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nota</label>
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