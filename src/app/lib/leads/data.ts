'use server'

import { createClient } from "@/app/utils/server"

const ITEMS_PER_PAGE = 10;

export async function CountLeadFiltered(query: string, status?: string, source?: string) {
    const supabase = createClient();

    // Generar filtros para los campos especificados
    const fields = ['company_name', 'contact_name', 'contact_email', 'contact_phone'];
    const queryFilters = query
        ? query
            .split(' ')
            .map(q => fields.map(field => `${field}.ilike.%${q}%`).join(','))
            .join(',')
        : '';

    try {
        let supabaseQuery = supabase
            .from("leads")
            .select('*', { count: 'exact', head: true })
            .order('date_of_first_contact', { ascending: false });

        // Aplica filtros dinámicos si existen
        if (queryFilters) {
            supabaseQuery = supabaseQuery.or(queryFilters);
        }

        if (status) {
            supabaseQuery = supabaseQuery.eq('status', status);
        }

        if (source) {
            supabaseQuery = supabaseQuery.eq('source', source);
        }

        const { count, error } = await supabaseQuery;

        if (error) {
            console.error("Database error in table leads:", error);
            throw new Error("Failed to fetch data from leads");
        }

        const totalPages = Math.ceil(Number(count || 0) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error("Database error:", error);
        return 0;
    }
}


export async function FetchLeadsFiletered(
    query: string,
    currentPage: number,
    status?: string,
    source?: string
) {
    const supabase = createClient();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    // Campos para el filtro de búsqueda
    const fields = ['company_name', 'contact_name', 'contact_email', 'contact_phone'];
    const queryFilters = query
        ? query
            .split(' ')
            .map(q => fields.map(field => `${field}.ilike.%${q}%`).join(','))
            .join(',')
        : '';

    try {
        // Inicializar la consulta
        let supabaseQuery = supabase
            .from("leads")
            .select("*")
            .order('date_of_first_contact', { ascending: false })
            .range(offset, offset + ITEMS_PER_PAGE - 1);

        // Agregar filtros de búsqueda si existen
        if (queryFilters) {
            supabaseQuery = supabaseQuery.or(queryFilters);
        }

        // Filtro por `status`
        if (status) {
            supabaseQuery = supabaseQuery.eq('status', status);
        }

        // Filtro por `source`
        if (source) {
            supabaseQuery = supabaseQuery.eq('source', source);
        }

        // Ejecutar la consulta
        const { data, error } = await supabaseQuery;

        if (error) {
            console.error("Database Error:", error);
            throw new Error('Failed To Fetch Data');
        }

        return data;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error('Failed To Fetch Data');
    }
}


export async function fetchLeadByID(id: string) {
    try {
        const supabase = createClient();
        const data = await supabase
            .from("leads")
            .select("*")
            .eq("id", id)
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch lead.');
    }
}