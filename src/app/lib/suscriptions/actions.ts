'use server'

import { createClient } from "@/app/utils/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"


const CreateSuscriptionSchema = z.object({
    service: z.string()
        .refine(val => val !== "default", { message: 'Selecciona un servicio válido' })
            .pipe(z.enum(['HOST', 'DOM', 'SSL', 'SUP', 'Email', 'CRM'])),
    client: z.string()
        .refine(val => val !== "default", { message: "Selecciona un cliente valido" }),
    contact: z.string()
        .refine(val => val !== "default", { message: "Selecciona un contacto valido" }),
    form_date: z.string().min(1, 'Ingresa la fecha de inicio de la suscripcion'),
    each: z.coerce.number().optional(),
    each_type: z.string()
        .refine(val => val !== "default" , { message: "Selecciona cada cuanto se renovara la suscripcion" })
            .pipe(z.enum(['days','weeks','months','years','no_each'])),
    renovation_date: z.string().min(1, "Por que no se ah autogenerado?"),
    concept: z.string().min(1, "Ingresa en concepto"),
    //Cobros:
    charge: z.coerce.number().gte(0, {message: 'Por favor ingresa el cargo por la suscripcion o pong 0'}),
    badge: z.enum(['mxn','usd'], {
        message: 'Selecciona una divisa valida'
    }),
    tax: z.coerce.number().optional(),
    discount: z.coerce.number().optional(),
    discount_type: z.enum(['percentaje','fix', 'no_discount'], {
        message: 'Selecciona una opcion valida'
    }),
    tax_calc: z.coerce.number().optional(),
    subtotal: z.coerce.number().gte(0, { message: 'Por que no se ah autogenerado?' }),
    total: z.coerce.number().gte(0, { message: 'Por que no se ah autogenerado?' }),
    // Notas
    notes: z.array(z.string()).optional()
}, { invalid_type_error: 'Por favor revisa que hayas ingresado los datos requeridos' });

export type State = {
    errors?:{
        service?: string[];
        client?: string[];
        contact?: string[];
        form_date?: string[]
        each?: string[];
        each_type?: string[];
        renovation_date?: string[];
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
    }
    status?: string | null;
    message?: string | null;
}

export async function createSuscription(prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateSuscriptionSchema.safeParse({
        service: formData.get('service') || "",
        client: formData.get('client') || "",
        contact: formData.get('contact') || "",
        form_date: formData.get('form_date') || "",
        each: formData.get('each') || "",
        each_type: formData.get('each_type') || "",
        renovation_date: formData.get('renovation_date') || "",
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


    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Rellena todos los campos requeridos para crear la suscripcion"
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
    const { service, client, contact, form_date, each, each_type, renovation_date, concept, charge, badge, tax, tax_calc, discount, discount_type, subtotal, total} = validateFields.data;

    const result = await supabase.from("suscriptions").insert({
        service: service,
        client: client,
        contact: contact,
        form_date: new Date(form_date),
        each: each,
        each_type: each_type,
        renewal_date: new Date(renovation_date),
        concept: concept,
        amount: charge,
        badge: badge,
        tax: tax,
        tax_calc: tax_calc,
        discount: discount,
        discount_type: discount_type,
        subtotal: subtotal,
        total: total,
        balance: total,
        notes: notes
    });
    console.log(result)
    revalidatePath('/dashboard/suscription')
    redirect('/dashboard/suscription')

    return {
        errors: {},
        status: "successful",
        message: "Cliente creado exitosamente",
    };

}

export async function UpdateSuscription(id: string, prevState: State, formData: FormData): Promise<State> {
        const validateFields = CreateSuscriptionSchema.safeParse({
            service: formData.get('service') || "",
            client: formData.get('client') || "",
            contact: formData.get('contact') || "",
            form_date: formData.get('form_date') || "",
            each: formData.get('each') || "",
            each_type: formData.get('each_type') || "",
            renovation_date: formData.get('renovation_date') || "",
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
                message: "Llena todos los campos requeridos para editar la suscripcion"
            };
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
        const { service, client, contact, form_date, each, each_type, renovation_date, concept, charge, badge, tax, tax_calc, discount, discount_type, subtotal, total} = validateFields.data;


        await supabase.from("suscriptions").update({
            service: service,
            client: client,
            contact: contact,
            form_date: new Date(form_date),
            each: each,
            each_type: each_type,
            renewal_date: new Date(renovation_date),
            concept: concept,
            amount: charge,
            badge: badge,
            tax: tax,
            tax_calc: tax_calc,
            discount: discount,
            discount_type: discount_type,
            subtotal: subtotal,
            total: total,
            balance: total,
            notes: notes
        }).eq('id', id)
        revalidatePath('/dashboard/suscription')
        redirect('/dashboard/suscription')

        return {
            errors: {},
            status: "successful",
            message: "Cliente creado exitosamente",
        };
}

export async function RenewalSuscription(renewed_from_id : string, prevState: State, formData: FormData): Promise<State> {
    const validateFields = CreateSuscriptionSchema.safeParse({
        service: formData.get('service') || "",
        client: formData.get('client') || "",
        contact: formData.get('contact') || "",
        form_date: formData.get('form_date') || "",
        each: formData.get('each') || "",
        each_type: formData.get('each_type') || "",
        renovation_date: formData.get('renovation_date') || "",
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


    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            status: "error",
            message: "Rellena todos los campos requeridos para renovar la suscripcion"
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
    const { service, client, contact, form_date, each, each_type, renovation_date, concept, charge, badge, tax, tax_calc, discount, discount_type, subtotal, total} = validateFields.data;
    
    const result = await supabase.from("suscriptions").insert({
        service: service,
        client: client,
        contact: contact,
        form_date: new Date(form_date),
        each: each,
        each_type: each_type,
        renewal_date: new Date(renovation_date),
        concept: concept,
        amount: charge,
        badge: badge,
        tax: tax,
        tax_calc: tax_calc,
        discount: discount,
        discount_type: discount_type,
        subtotal: subtotal,
        total: total,
        balance: total,
        notes: notes,
        renewed_from: renewed_from_id

    });

    await supabase.from("suscriptions").update({
        renewed_from_date: new Date(form_date),
    }).eq('id', renewed_from_id)


    console.log(result)
    revalidatePath('/dashboard/suscription')
    redirect('/dashboard/suscription')
    
    return {
        errors: {},
        status: "successful",
        message: "Cliente creado exitosamente",
    };
}

export async function DeleteSuscription(id: string) {
    const supabase = createClient();
    try{
        const response = await supabase
            .from("suscriptions")
            .delete()
            .eq("id", id)
        revalidatePath("/dashboard/clients")
        return response;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete a suscription.');
    }
}