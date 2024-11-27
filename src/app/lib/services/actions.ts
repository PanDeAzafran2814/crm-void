'use server'

import { createClient } from "@/app/utils/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"

const CreateServiceSchema = z.object({
    service: z.string()
        .refine(val => val !== "default", { message: 'Selecciona un servicio válido' })
        .pipe(z.enum(['SUPPORT', 'WDEV', 'WDESING', 'CHANGESWEB', 'EXPORWEB', 'UPWEB', 'APPDEV', 'APPDESING', 'CHANGESAPP', 'UPAPP', 'BRANDING', 'LOGODESING', 'INDESING'])),
    client: z.string()
        .refine(val => val !== "default", { message: "Selecciona un cliente valido" }),
    contact: z.string()
        .refine(val => val !== "default", { message: "Selecciona un contacto valido" }),
    start_date: z.string().min(1, 'Ingresa la fecha de inicio estimada del servicio'),
    finish_date: z.string().min(1, 'Ingresa la fecha de finalizacion estimada del servicio'),
    status: z.string()
        .refine(val => val !== "default", { message: 'Selecciona un status válido' })
        .pipe(z.enum(['NEW', 'INPROGRESS', 'CANCELED', 'FIISHED', 'POSTPONED', 'DATECHANGE'])),
    concept: z.string().min(1, "Ingresa en concepto"),
    charge: z.coerce.number().gte(0, { message: 'Por favor ingresa el cargo por la suscripcion o pong 0' }),
    badge: z.enum(['mxn', 'usd'], {
        message: 'Selecciona una divisa valida'
    }),
    tax: z.coerce.number().optional(),
    discount: z.coerce.number().optional(),
    discount_type: z.enum(['percentaje', 'fix', 'no_discount'], {
        message: 'Selecciona una opcion valida'
    }),
    tax_calc: z.coerce.number().optional(),
    subtotal: z.coerce.number().gte(0, { message: 'Por que no se ah autogenerado?' }),
    total: z.coerce.number().gte(0, { message: 'Por que no se ah autogenerado?' }),
    notes: z.array(z.string()).optional(),
    tasks: z.array(z.string()).optional()
}, { invalid_type_error: 'Por favor revisa que hayas ingresado los datos requeridos' });

export type State = {
    errors?: {
        service?: string[];
        client?: string[];
        contact?: string[];
        start_date?: string[];
        finish_date?: string[];
        status?: string[];
        concept?: string[]
        charge?: string[];
        badge?: string[];
        tax?: string[];
        discount?: string[];
        discount_type?: string[];
        tax_calc?: string[];
        subtotal?: string[];
        total?: string[];
        notes?: string[];
        tasks?: string[];
    }
    status?: string | null;
    message?: string | null;
}

export async function CreateService(prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateServiceSchema.safeParse({
        service: formData.get('service') || "",
        client: formData.get('client') || "",
        contact: formData.get('contact') || "",
        start_date: formData.get('start_date') || "",
        finish_date: formData.get('finish_date') || "",
        status: formData.get('status') || "",
        concept: formData.get('concept') || "",
        charge: formData.get('charge') || "",
        badge: formData.get('badge') || "",
        tax: formData.get('tax') || "",
        discount: formData.get('discount') || "",
        discount_type: formData.get('discount_type') || "",
        tax_calc: formData.get('tax_calc') || "",
        subtotal: formData.get('subtotal') || "",
        total: formData.get('total') || "",
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Rellena todos los campos requeridos para crear el servicio"
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

    const tasks = [];
    let taskIndex = 0;
    while (formData.get(`tasks[${taskIndex}][title]`)) {
        tasks.push({
            title: formData.get(`tasks[${taskIndex}][title]`) as string,
            desc: formData.get(`tasks[${taskIndex}][desc]`) as string,
            status: formData.get(`tasks[${taskIndex}][status]`) as string,
            fecha: formData.get(`tasks[${taskIndex}][fecha]`) as string,
        });
        taskIndex++;
    }

    const supabase = createClient();
    const { service, client, contact, start_date, finish_date, status, concept, charge, badge, tax, tax_calc, discount, discount_type, subtotal, total } = validateFields.data

    const result = await supabase.from("services").insert({
        service: service,
        client: client,
        contact: contact,
        start_date: new Date(start_date),
        finish_date: new Date(finish_date),
        status: status,
        concept: concept,
        amount: charge,
        badge: badge,
        tax: tax,
        tax_calc: tax_calc,
        discount: discount,
        discount_type: discount_type,
        subtotal: subtotal,
        total: total,
        notes: notes,
        tasks: tasks
    })
    console.log(result)
    revalidatePath('/dashboard/services')
    redirect('/dashboard/services')

    return {
        errors: {},
        status: "successful",
        message: "Servicio creado exitosamente",
    };
}

export async function UpdateService(id: string, prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateServiceSchema.safeParse({
        service: formData.get('service') || "",
        client: formData.get('client') || "",
        contact: formData.get('contact') || "",
        start_date: formData.get('start_date') || "",
        finish_date: formData.get('finish_date') || "",
        status: formData.get('status') || "",
        concept: formData.get('concept') || "",
        charge: formData.get('charge') || "",
        badge: formData.get('badge') || "",
        tax: formData.get('tax') || "",
        discount: formData.get('discount') || "",
        discount_type: formData.get('discount_type') || "",
        tax_calc: formData.get('tax_calc') || "",
        subtotal: formData.get('subtotal') || "",
        total: formData.get('total') || "",
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Rellena todos los campos requeridos para crear el servicio"
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

    const tasks = [];
    let taskIndex = 0;
    while (formData.get(`tasks[${taskIndex}][title]`)) {
        tasks.push({
            title: formData.get(`tasks[${taskIndex}][title]`) as string,
            desc: formData.get(`tasks[${taskIndex}][desc]`) as string,
            status: formData.get(`tasks[${taskIndex}][status]`) as string,
            fecha: formData.get(`tasks[${taskIndex}][fecha]`) as string,
        });
        taskIndex++;
    }

    const supabase = createClient();
    const { service, client, contact, start_date, finish_date, status, concept, charge, badge, tax, tax_calc, discount, discount_type, subtotal, total } = validateFields.data

    const result = await supabase.from("services").update({
        service: service,
        client: client,
        contact: contact,
        start_date: new Date(start_date),
        finish_date: new Date(finish_date),
        status: status,
        concept: concept,
        amount: charge,
        badge: badge,
        tax: tax,
        tax_calc: tax_calc,
        discount: discount,
        discount_type: discount_type,
        subtotal: subtotal,
        total: total,
        notes: notes,
        tasks: tasks
    }).eq('id', id)
    console.log(result)
    revalidatePath('/dashboard/services')
    redirect('/dashboard/services')

    return {
        errors: {},
        status: "successful",
        message: "Servicio creado exitosamente",
    };
}

