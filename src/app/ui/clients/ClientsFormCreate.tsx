'use client'
import { BuildingOffice2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import logovoid from "@/app/assets/images/logo.png";
import { SubmitButton } from "../submit-button";
import { useFormState } from "react-dom";
import { createClients } from "@/app/lib/actions";

export default function ClientsFormCreate(){

    const [Tab, SetTab] = useState("company");
    const initialState = { message: null, status: "none", errors: {} }
    const [state, dispatch] = useFormState(createClients, initialState)
    const [logoimg, setlogoimage] = useState("");
    const [Contactos, setContactos] = useState([{ nombre: '', email: '', position: '', celular: '', telefono: '' }]);
    const [Notas, setNotas] = useState([{ nota: '', fecha: new Date().toISOString() }]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const files = e.target.files;

        if(!files){
            console.error("No files found in the input.")
            return;
        } 

        const file = files[0]
        if(file){
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
            if(!validTypes.includes(file.type)){
                setlogoimage(logovoid.src)
                console.error("El archivo seleccionado no es imagen valida")
                return;
            }
            const src = URL.createObjectURL(file);
            setlogoimage(src)
        }
    }

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

    /// Contactos ///

    const handleAddContact = () => {
        setContactos([...Contactos, { nombre: '', email: '', position: '', celular: '', telefono: '' }]);
    };

    type ContactField = 'nombre' | 'email' | 'position' | 'celular' | 'telefono';

    
    const handleChangeContact = (index: number, field: ContactField, value: string) => {
        const newContactos = [...Contactos];
        newContactos[index][field] = value;  // Ahora TypeScript reconoce que 'field' es una de las claves válidas
        setContactos(newContactos);
    };
    
    const handleRemoveContact = (index: number) => {
        const newContactos = Contactos.filter((_, i) => i !== index);
        setContactos(newContactos);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget as HTMLFormElement);
    
        // Agregar las notas al FormData (incluyendo 'nota' y 'fecha')
        Notas.forEach((notaObj, index) => {
            formData.append(`notes[${index}][nota]`, notaObj.nota);
            formData.append(`notes[${index}][fecha]`, notaObj.fecha);
        });
    
        // Agregar los contactos al FormData
        Contactos.forEach((contacto, index) => {
            formData.append(`contacts[${index}][nombre]`, contacto.nombre);
            formData.append(`contacts[${index}][email]`, contacto.email);
            formData.append(`contacts[${index}][position]`, contacto.position);
            formData.append(`contacts[${index}][celular]`, contacto.celular);
            formData.append(`contacts[${index}][telefono]`, contacto.telefono);
        });
    
        // Ahora puedes enviar el formData
        //const result = await dispatch(formData);
        await dispatch(formData);
    };
    

    console.log({
        Notas,
        Contactos
    })

    return (
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
            
            </ul>
            <form className="w-5/6 h-[90%] bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
                <div className={`p-6 text-medium w-full h-full ${Tab === "company"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Informacion De La Empresa</h3>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre *</label>
                                {state.errors?.name &&
                                    state.errors?.name.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electronico *</label>
                                {state.errors?.contact_email &&
                                    state.errors?.contact_email.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono</label>
                            </div>
                        </div>
                    </div>
                    {/****/}
                    <div className="mt-5 flex space-x-3">
                        <div className="w-4/12">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dirreccion</label>
                            </div>
                        </div>
                        <div className="w-3/12">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ciudad *</label>
                                {state.errors?.contact_city &&
                                    state.errors?.contact_city.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-3/12">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_state" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado</label>
                            </div>
                        </div>
                        <div className="w-2/12">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_zip" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Codigo Postal</label>
                            </div>
                        </div>
                    </div>
                    {/****/}
                    <div className="mt-5 flex items-center space-x-3">
                        <div className="flex items-center space-x-6 w-1/2">
                            <div className="shrink-0">
                                <img 
                                    width={26}
                                    height={26}
                                    className="h-32 w-32 object-cover rounded-full" 
                                    src={logoimg? logoimg: logovoid.src} 
                                    alt="Company Logo" />
                            </div>
                            <label className="block">
                                <span className="sr-only">Selecciona El Logo Del Cliente</span>
                                <input type="file" name="client_logo" onChange={(e)=>{handleImageChange(e)}} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                            </label>
                        </div>
                        <div className="w-1/2">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="date" name="association_date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha De Asociacion</label>
                                {state.errors?.association_date &&
                                    state.errors?.association_date.map((error: string) =>(
                                        <p key={error} className="text-red-600 text-xs">
                                            {error}
                                        </p>
                                    ))
                                }
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
                                    <div className="w-1/6">
                                        <div className="relative z-0 w-full group">
                                            <input type="text" value={contact.nombre} onChange={(e) => handleChangeContact(index, 'nombre', e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre *</label>
                                        </div>
                                    </div>
                                    <div className="w-1/6">
                                        <div className="relative z-0 w-full group">
                                            <input type="text" value={contact.email} onChange={(e) => handleChangeContact(index, 'email', e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electronico *</label>
                                        </div>
                                    </div>
                                    <div className="w-1/6">
                                        <div className="relative z-0 w-full group">
                                            <input type="text" value={contact.position} onChange={(e) => handleChangeContact(index, 'position', e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Position *</label>
                                        </div>
                                    </div>
                                    <div className="w-1/6">
                                        <div className="relative z-0 w-full group">
                                            <input type="text" value={contact.celular} onChange={(e) => handleChangeContact(index, 'celular', e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Celular</label>
                                        </div>
                                    </div>
                                    <div className="w-1/6">
                                        <div className="relative z-0 w-full group">
                                            <input type="text" value={contact.telefono} onChange={(e) => handleChangeContact(index, 'telefono', e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-PrimaryBg peer" placeholder=" "  />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-PrimaryBg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono</label>
                                        </div>
                                    </div>
                                    <div className="w-1/6 flex justify-center">
                                        <button type="button" onClick={() => handleRemoveContact(index)} className="text-white bg-SecondaryBg hover:bg-PrimaryBg rounded-lg py-1 px-2 w-full">Eliminar</button>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="mt-5">
                            <button type="button" onClick={() => handleAddContact()} className="text-white bg-SecondaryBg hover:bg-PrimaryBg rounded-lg py-1 px-2 w-full">Agregar Contacto +</button>
                        </div>                        
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