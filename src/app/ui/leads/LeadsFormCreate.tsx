'use client'
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import { useFormState } from "react-dom";
import moment from "moment";
import { CreateLead } from "@/app/lib/leads/actions";

export default function LeadsFormCreate(){

    const [Tab, SetTab] = useState("company");
    const initialState = { message: null, status: "none", errors: {} }
    const [state, dispatch] = useFormState(CreateLead, initialState)
    const [Notas, setNotas] = useState([{ nota: '', fecha: new Date().toISOString() }]);



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
    
        // Agregar las notas al FormData (incluyendo 'nota' y 'fecha')
        Notas.forEach((notaObj, index) => {
            formData.append(`notes[${index}][nota]`, notaObj.nota);
            formData.append(`notes[${index}][fecha]`, notaObj.fecha);
        });
    
        // Ahora puedes enviar el formData
        //const result = await dispatch(formData);
        await dispatch(formData);
    };
    


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
                    <a onClick={()=>{SetTab("notes")}} className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${Tab === "notes"? "text-white bg-PrimaryBg" : "text-PrimaryBg border-PrimaryBg border"}`}>
                        <BuildingOffice2Icon className="w-4 h-4 me-2"/>
                        Notas
                    </a>
                </li>
            
            </ul>
            <form className="w-5/6 h-[90%] bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
                <div className={`p-6 text-medium w-full h-full ${Tab === "company"? "" : "hidden"}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Informacion Del Prospecto</h3>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_name" className="input-basic peer" placeholder=" "  />
                                <label className="label-basic">Nombre Del Contacto *</label>
                            </div>
                            {state.errors?.contact_name &&
                                state.errors?.contact_name.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                        
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_email" className="input-basic peer" placeholder=" " />
                                <label className="label-basic">Correo Del Contacto</label>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_phone" className="input-basic peer" placeholder=" " />
                                <label className="label-basic">Telefono Del Contacto</label>
                            </div>
                        </div>
                    </div>
                    {/***/}
                    <div className="mt-5 flex space-x-3">
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_company" className="input-basic peer" placeholder=" "  />
                                <label className="label-basic">Nombre De La Empresa</label>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="relative z-0 w-full group">
                                <input type="text" name="contact_position" className="input-basic peer" placeholder=" "  />
                                <label className="label-basic">Cargo Del Contacto</label>
                            </div>
                        </div>
                    </div>
                    {/***/}
                    <div className="mt-5 flex space-x-3">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Seguimiento</h3>
                    </div>
                    <div className="mt-5 flex space-x-3">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Status *</label>
                            <select id="status" name="status" className="select-basic">
                                <option value="default" selected>Elige Un Status</option>
                                <option value="CONTACT">Contactar</option>
                                <option value="CONTACTED">Contactado</option>
                                <option value="CLOSED">Cerrado</option>
                                <option value="UNANSWERED">Sin Respuesta</option>
                                <option value="WAITINGMEETING">Esperando Agendar Reunion</option>
                                <option value="EMAILSEND">Correo Enviado</option>
                                <option value="WHATSAPPSEND">Whatsapp Enviado</option>
                                <option value="WAITINGANSERED">Esperando Respuesta</option>
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
                                <input 
                                    type="date" 
                                    name="first_contact_date" 
                                    className="input-basic peer" 
                                    placeholder=" "  
                                />
                                <label className="label-basic">Fecha De Primer Contacto</label>
                            </div>
                            {state.errors?.first_contact_date &&
                                state.errors?.first_contact_date.map((error: string) =>(
                                    <p key={error} className="text-red-600 text-xs">
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-5 flex space-x-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Clasificacion</h3>
                </div>
                <div className="mt-5 flex space-x-3">
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Fuente</label>
                        <select id="source" name="source" className="select-basic">
                            <option value="default" selected>Elige La Fuente Del Contacto</option>
                            <option value="MAPS">Maps</option>
                            <option value="GOOGLE">Google</option>
                            <option value="FB">Facebook</option>
                            <option value="INSTA">Instagram</option>
                            <option value="TIKTOK">TikTok</option>
                            <option value="WP">Whatsapp</option>
                            <option value="MAIL">Correo</option>
                            <option value="CALL">Llamada</option>
                            <option value="VOIDFORM">Formulario De Contacto VOID</option>
                            <option value="ADVISE">Recomendacion</option>
                            <option value="LINKFOOTER">Link En Sitios De Nuestros Clientes</option>
                            <option value="INPERSON">En Persona</option>
                            <option value="BUSSINESCARD">Tarjeta De Contacto</option>
                        </select>
                        {state.errors?.source &&
                            state.errors?.source.map((error: string) =>(
                                <p key={error} className="text-red-600 text-xs">
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    
                </div>
                </div>
                {/***/}
                
               
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
                                            className="input-basic peer" 
                                            placeholder=" "  
                                        />
                                        <label className="label-basic">Nota: {moment(notaObj.fecha).format("LL")}</label>
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