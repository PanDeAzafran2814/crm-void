'use server'

import { createClient } from "@/app/utils/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"

const CreateLeadSchema = z.object({
    contact_name: z.string().min(1, "Por Favor Escribe el nombre del contacto"),
    contact_email: z.string().optional(),
    contact_phone: z.string().optional(),
    contact_company: z.string().optional(),
    contact_position: z.string().optional(),
    status: z.string()
        .refine(val => val !== "default", { message: 'Selecciona Un Status Valido' })
        .pipe(z.enum(['CONTACT', 'CONTACTED', 'CLOSED', 'UNANSWERED', 'WAITINGMEETING', 'EMAILSEND', 'WHATSAPPSEND', 'WAITINGANSERED'])),
    first_contact_date: z.string().min(1, "Ingresa la fecha"),
    last_contact_date: z.string().optional(),
    source: z.string()
        .refine(val => val !== "default", { message: 'Selecciona Un Status Valido' })
        .pipe(z.enum(['MAPS', 'GOOGLE', 'FB', 'INSTA', 'TIKTOK', 'WP', 'MAIL', 'CALL', 'VOIDFORM', 'ADVISE', 'LINKFOOTER', 'IN-PERSON', 'BUSSINESCARD'])),
    notes: z.array(z.string()).optional()
}, { invalid_type_error: 'Por favor ingresa los datos correctamente' });

export type State = {
    errors?: {
        contact_name?: string[];
        contact_email?: string[];
        contact_phone?: string[];
        contact_company?: string[];
        contact_position?: string[];
        status?: string[];
        first_contact_date?: string[];
        last_contact_date?: string[];
        source?: string[];
        notes?: string[];
    }
    status?: string | null;
    message?: string | null;
}

export async function CreateLead(prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateLeadSchema.safeParse({
        contact_name: formData.get('contact_name') || "",
        contact_email: formData.get('contact_email') || "",
        contact_phone: formData.get('contact_phone') || "",
        contact_company: formData.get('contact_company') || "",
        contact_position: formData.get('contact_position') || "",
        status: formData.get('status') || "",
        first_contact_date: formData.get('first_contact_date') || "",
        last_contact_date: formData.get('last_contact_date') || "",
        source: formData.get('source') || "",
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Llena los campos requeridos para crear el lead"
        }
    }

    const notes = [];
    let noteIndex = 0;
    while (formData.get(`notes[${noteIndex}][nota]`)) {
        notes.push({
            nota: formData.get(`notes[${noteIndex}][nota]`) as string,
            fecha: formData.get(`notes[${noteIndex}][fecha]`) as string,
        });
        noteIndex++;
    }

    const supabase = createClient();
    const { contact_name, contact_email, contact_phone, contact_company, contact_position, status, first_contact_date, source } = validateFields.data

    await supabase.from("leads").insert({
        company_name: contact_company,
        contact_name: contact_name,
        contact_email: contact_email,
        contact_phone: contact_phone,
        contact_position: contact_position,
        status: status,
        date_of_first_contact: new Date(first_contact_date),
        source: source,
        notes: notes
    })

    revalidatePath("/dashboard/leads/")
    redirect("/dashboard/leads")

    return {
        errors: {},
        status: "successful",
        message: "Cliente creado exitosamente",
    };
}

export async function UpdateLead(id: string, prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateLeadSchema.safeParse({
        contact_name: formData.get('contact_name') || "",
        contact_email: formData.get('contact_email') || "",
        contact_phone: formData.get('contact_phone') || "",
        contact_company: formData.get('contact_company') || "",
        contact_position: formData.get('contact_position') || "",
        status: formData.get('status') || "",
        first_contact_date: formData.get('first_contact_date') || "",
        last_contact_date: formData.get('last_contact_date') || "",
        source: formData.get('source') || "",
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Llena los campos requeridos para crear el lead"
        }
    }

    const notes = [];
    let noteIndex = 0;
    while (formData.get(`notes[${noteIndex}][nota]`)) {
        notes.push({
            nota: formData.get(`notes[${noteIndex}][nota]`) as string,
            fecha: formData.get(`notes[${noteIndex}][fecha]`) as string,
        });
        noteIndex++;
    }

    const supabase = createClient();
    const { contact_name, contact_email, contact_phone, contact_company, contact_position, status, first_contact_date, source } = validateFields.data
    await supabase.from("leads").update({
        company_name: contact_company,
        contact_name: contact_name,
        contact_email: contact_email,
        contact_phone: contact_phone,
        contact_position: contact_position,
        status: status,
        date_of_first_contact: new Date(first_contact_date),
        source: source,
        notes: notes
    }).eq("id", id)

    revalidatePath("/dashboard/leads/")
    redirect("/dashboard/leads")

    return {
        errors: {},
        status: "successful",
        message: "Lead Actualizado exitosamente",
    };
}

export async function DeleteLead(id: string) {
    const supabase = createClient();
    try {
        const response = await supabase
            .from("leads")
            .delete()
            .eq("id", id)
        revalidatePath("/dasboard/leads")
        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete a lead.');
    }
}