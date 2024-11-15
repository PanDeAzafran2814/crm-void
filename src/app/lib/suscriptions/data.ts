'use server'

import { createClient } from "@/app/utils/server"

const ITEMS_PER_PAGE = 10;

export async function fetchClientsFormCreate() {
    const supabase = createClient();
    try {
        const clients = await supabase
            .from('clients')
            .select('id, name, contacts')
            .order('association_date', { ascending: false })
            .not('visible', 'eq', false)

        return clients.data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch clients to susciptions form')
    }
}

export async function CountSuscriptionFiltered(query: string) {
    const supabase = createClient();

    try {
        const { count, error } = await supabase
            .from('suscriptions')
            .select('*, client!inner(name)', { count: 'exact', head: true })
            .or(`service.ilike.%${query}%`)

            .order('renewal_date', { ascending: false })



        if (!count) {
            console.error("Database error in table suscriptions:", error);
            throw new Error("Failed To fetch data to suscriptions");
        }
        const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
        return Number(totalPages)
    } catch (error) {
        console.error("Database error:", error)
        return 0;
    }
}

export async function FetchSuscriptionsFiltered(
    query: string,
    currentPage: number
) {
    const supabase = createClient();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const susciptions = await supabase
            .from('suscriptions')
            .select('*, client!inner(name,client_logo,contacts)')
            .or(`service.ilike.%${query}%`)
            .order('renewal_date', { ascending: false })
            .range(offset, offset + ITEMS_PER_PAGE - 1)
            .limit(ITEMS_PER_PAGE)
        return susciptions.data;
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error('Failed To Fetch Data')
    }
}

export async function fetchSuscriptionsByID(id: string) {
    try {
        const supabase = createClient();
        const data = await supabase
            .from('suscriptions')
            .select('*, client!inner(id,name,contacts)')
            .eq('id', id)
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Suscription.');
    }
}