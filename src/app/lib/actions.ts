'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "../utils/server";


const CreateClientSchema = z.object({
    name: z.string().min(1, "Por favor escribe el nombre del cliente"),
    contact_email: z.string().min(1, "Por favor escribe el nombre de contacto"),
    contact_phone: z.string().optional(),
    contact_address: z.string().optional(),
    contact_city: z.string().min(1, "Por favor escribe la ciudad"),
    contact_state: z.string().optional(),
    contact_zip: z.string().optional(),
    notes: z.array(z.string()).optional(),
    contacts: z.array(z.string()).optional(),
    association_date: z.string().min(1, "Por favor seleccione la fecha de asociación")
}, { invalid_type_error: 'Por favor proporciona los datos correctos.' });

export type State = {
    errors?: {
        name?: string[];
        contact_email?: string[];
        contact_phone?: string[];
        contact_address?: string[];
        contact_city?: string[];
        contact_state?: string[];
        contact_zip?: string[];
        notes?: string[];
        contacts?: string[];
        logo?: string[];
        association_date?: string[];
    };
    status?: string | null;
    message?: string | null;
};

export async function createClients(prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateClientSchema.safeParse({
        name: formData.get('name') || "",
        contact_email: formData.get('contact_email') || "",
        contact_phone: formData.get('contact_phone') || "",
        contact_address: formData.get('contact_address') || "",
        contact_city: formData.get('contact_city') || "",
        contact_state: formData.get('contact_state') || "",
        contact_zip: formData.get('contact_zip') || "",
        logo: formData.get('client_logo') || "",
        association_date: formData.get("association_date"),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Llena todos los campos requeridos para crear el cliente"
        };
    }

    // Reconstruir el array de notas
    const notes = [];
    let noteIndex = 0;
    while (formData.get(`notes[${noteIndex}][nota]`)) {
        notes.push({
            nota: formData.get(`notes[${noteIndex}][nota]`) as string,
            fecha: formData.get(`notes[${noteIndex}][fecha]`) as string,
        });
        noteIndex++;
    }

    // Reconstruir el array de contactos
    const contacts = [];
    let index = 0;
    while (formData.get(`contacts[${index}][nombre]`)) {
        contacts.push({
            nombre: formData.get(`contacts[${index}][nombre]`) as string,
            email: formData.get(`contacts[${index}][email]`) as string,
            position: formData.get(`contacts[${index}][position]`) as string,
            celular: formData.get(`contacts[${index}][celular]`) as string,
            telefono: formData.get(`contacts[${index}][telefono]`) as string,
        });
        index++;
    }

    console.log({ contacts, notes });

    const { name, contact_email, contact_phone, contact_address, contact_city, contact_state, contact_zip, association_date } = validateFields.data;
    const supabase = createClient();

    const logo = formData.get("client_logo") as File;
    if (logo?.size) {
        if (logo && (logo.size > 2 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(logo.type))) {
            return {
                errors: { logo: ["Proporciona un archivo de imagen válido (JPG, PNG, GIF, SVG) y menor a 2MB."] },
                status: "error",
                message: "Llena todos los campos requeridos para crear el cliente",
            }
        }

        const name_folder = name.replace(/\s+/g, '-');
        const UploadImage = await supabase
            .storage
            .from("crm")
            .upload(`clients_avatars/${name_folder}/logo.png`, logo, {
                cacheControl: '3600',
                upsert: false
            })

        console.log("imagen status", UploadImage)

        if (UploadImage.data?.path) {
            const PublicURL = await supabase
                .storage
                .from('crm')
                .getPublicUrl(UploadImage.data?.path)


            const result = await supabase.from("clients").insert({
                name: name,
                contact_phone: contact_phone,
                contact_email: contact_email,
                contact_address: contact_address,
                contact_city: contact_city,
                contact_state: contact_state,
                contact_zip: contact_zip,
                contacts: contacts,
                notes: notes,
                client_logo: PublicURL.data.publicUrl,
                association_date: association_date ? new Date(association_date) : null
            })
            console.log(result)
            revalidatePath('/dashboard/clients')
            redirect('/dashboard/clients')
        } else {
            return {
                status: "error",
                message: "Error al subir la imagen al servidor"
            };
        }

    } else {
        const result = await supabase.from("clients").insert({
            name: name,
            contact_phone: contact_phone,
            contact_email: contact_email,
            contact_address: contact_address,
            contact_city: contact_city,
            contact_state: contact_state,
            contact_zip: contact_zip,
            contacts: contacts,
            notes: notes,
            client_logo: "",
            association_date: association_date ? new Date(association_date) : null
        })
        console.log(result)
        revalidatePath('/dashboard/clients')
        redirect('/dashboard/clients')
    }

    return {
        errors: {},
        status: "successful",
        message: "Cliente creado exitosamente",
    };
}

export async function updateClient(id: string, client_logo_old: string, prevState: State, fromData: FormData): Promise<State> {
    const validateFields = CreateClientSchema.safeParse({
        name: fromData.get('name') || "",
        contact_email: fromData.get('contact_email') || "",
        contact_phone: fromData.get('contact_phone') || "",
        contact_address: fromData.get('contact_address') || "",
        contact_city: fromData.get('contact_city') || "",
        contact_state: fromData.get('contact_state') || "",
        contact_zip: fromData.get('contact_zip') || "",
        //logo: fromData.get('client_logo') || "",
        association_date: fromData.get("association_date"),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Llena todos los campos requeridos para crear el cliente"
        };
    }

    // Reconstruir el array de notas
    const notes = [];
    let noteIndex = 0;
    while (fromData.get(`notes[${noteIndex}][nota]`)) {
        notes.push({
            nota: fromData.get(`notes[${noteIndex}][nota]`) as string,
            fecha: fromData.get(`notes[${noteIndex}][fecha]`) as string,
        });
        noteIndex++;
    }

    // Reconstruir el array de contactos
    const contacts = [];
    let contactIndex = 0;
    while (fromData.get(`contacts[${contactIndex}][nombre]`)) {
        contacts.push({
            nombre: fromData.get(`contacts[${contactIndex}][nombre]`) as string,
            email: fromData.get(`contacts[${contactIndex}][email]`) as string,
            position: fromData.get(`contacts[${contactIndex}][position]`) as string,
            celular: fromData.get(`contacts[${contactIndex}][celular]`) as string,
            telefono: fromData.get(`contacts[${contactIndex}][telefono]`) as string,
        });
        contactIndex++;
    }

    const { name, contact_email, contact_phone, contact_address, contact_city, contact_state, contact_zip, association_date } = validateFields.data;
    const supabase = createClient();

    const logo = fromData.get("client_logo") as File;
    const status = fromData.get("enable") || false
    console.log("enable", status)

    if (logo?.size) {
        if (logo && (logo.size > 2 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(logo.type))) {
            return {
                errors: { logo: ["Proporciona un archivo de imagen válido (JPG, PNG, GIF, SVG) y menor a 2MB."] },
                status: "error",
                message: "Llena todos los campos requeridos para crear el cliente",
            }
        }

        console.log(client_logo_old)

        const name_folder = name.replace(/\s+/g, '-');
        const UploadImage = await supabase
            .storage
            .from("crm")
            .upload(`clients_avatars/${name_folder}/logo`, logo, {
                cacheControl: '3600',
                upsert: true
            })
        console.log(UploadImage)
        if (UploadImage.data?.path) {
            const PublicURL = await supabase
                .storage
                .from('crm')
                .getPublicUrl(UploadImage.data?.path)


            const result = await supabase.from("clients").update({
                name: name,
                contact_phone: contact_phone,
                contact_email: contact_email,
                contact_address: contact_address,
                contact_city: contact_city,
                contact_state: contact_state,
                contact_zip: contact_zip,
                contacts: contacts,
                notes: notes,
                client_logo: PublicURL.data.publicUrl,
                association_date: association_date ? new Date(association_date) : null,
                enable: status
            }).eq('id', id)
            console.log(result)
            revalidatePath('/dashboard/clients')
            redirect('/dashboard/clients')
        } else {
            return {
                status: "error",
                message: "Error al subir la imagen al servidor"
            };
        }
    } else {
        await supabase.from("clients").update({
            name: name,
            contact_phone: contact_phone,
            contact_email: contact_email,
            contact_address: contact_address,
            contact_city: contact_city,
            contact_state: contact_state,
            contact_zip: contact_zip,
            contacts: contacts,
            notes: notes,
            association_date: association_date ? new Date(association_date) : null,
            enable: status
        }).eq('id', id)
        revalidatePath('/dashboard/clients')
        redirect('/dashboard/clients')
    }
    return {
        errors: {},
        status: "successful",
        message: "Cliente creado exitosamente",
    };
}

export async function fetchClientByID(id: string) {
    try {
        const supabase = createClient()
        const data = await supabase
            .from('clients')
            .select('*')
            .eq('id', id)
        return data;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Client.');
    }
}

export async function DeleteClient(id: string) {
    console.log("id llegando por el front", id);
    const supabase = createClient();
    try {
        const data = await supabase
            .from('clients')
            .update({
                visible: false
            })
            .eq('id', id)
        revalidatePath("/dashboard/clients")
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete a Client.');
    }
}