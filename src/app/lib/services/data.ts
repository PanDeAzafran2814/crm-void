'use server'

import { createClient } from "@/app/utils/server"

const ITEMS_PER_PAGE = 10;

export async function CountServiceFiltered(query: string, service?: string, status?: string) {
    const supabase = createClient();

    try {
        let services = supabase
            .from('services')
            .select('*, client!inner(name)', { count: 'exact', head: true })
            .order('finish_date', { ascending: false })

        if (query) {
            services = services.ilike('client.name', `%${query}%`)
        }

        if (service) {
            services = services.eq('service', service)
        }

        if (status) {
            services = services.eq('status', status)
        }

        const { count, error } = await services

        if (!count) {
            console.error("Database error in table services:", error);
            throw new Error("Failed To fetch data to services");
        }

        const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
        return Number(totalPages);
    } catch (error) {
        console.error("Database error:", error)
        return 0;
    }
}

export async function FetchServiceFiltered(
    query: string,
    currentPage: number,
    service?: string,
    status?: string
) {
    const supabase = createClient();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        let services = supabase
            .from("services")
            .select('*, client!inner(name,client_logo,contacts)')
            .order('finish_date', { ascending: false })
            .range(offset, offset + ITEMS_PER_PAGE - 1)
            .limit(ITEMS_PER_PAGE)

        if (query) {
            services = services.ilike('client.name', `%${query}%`)
        }

        if (service) {
            services = services.eq('service', service)
        }

        if (status) {
            services = services.eq('status', status)
        }

        const { data, error } = await services;

        if (error) {
            console.error("Database Error:", error);
            throw new Error('Failed To Fetch Data');
        }

        return data;
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error('Failed To Fetch Data')
    }
}

export async function fetchServiceByID(id: string) {
    try {
        const supabase = createClient();
        const data = await supabase
            .from('services')
            .select('*, client!inner(id,name,contacts)')
            .eq('id', id)
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch services.');
    }
}