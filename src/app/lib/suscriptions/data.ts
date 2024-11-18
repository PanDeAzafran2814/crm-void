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

export async function CountSuscriptionFiltered(query: string, service?: string, expiration?: string) {
    const supabase = createClient();
    const now = new Date();
    try {
        let susciptions = supabase
            .from('suscriptions')
            .select('*, client!inner(name)', { count: 'exact', head: true })
            .order('renewal_date', { ascending: false })

        if (query) {
            susciptions = susciptions.ilike('client.name', `%${query}%`)
        }

        if (service) {
            susciptions = susciptions.eq('service', service)
        }

        if (expiration) {
            if (expiration === "UNDEFEATED") {
                susciptions = susciptions.gt('renewal_date', new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString());
            } else if (expiration === "TOEXPIRE") {
                susciptions = susciptions.gte('renewal_date', now.toISOString())
                    .lte('renewal_date', new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString())
                    .is('renewed_from_date', null);
            } else if (expiration === "EXPIRED") {
                susciptions = susciptions.lt('renewal_date', now.toISOString())
                    .is('renewed_from_date', null);
            } else if (expiration === "RENEWAL") {
                susciptions = susciptions.not('renewed_from_date', 'is', null); // Mostrar solo los que tienen renewed_from definido
            }
        }

        const { count, error } = await susciptions


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
    currentPage: number,
    service?: string,
    expiration?: string
) {
    const supabase = createClient();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const now = new Date();
    try {
        let susciptions = supabase
            .from('suscriptions')
            .select('*, client!inner(name,client_logo,contacts)')
            .order('renewal_date', { ascending: false })
            .range(offset, offset + ITEMS_PER_PAGE - 1)
            .limit(ITEMS_PER_PAGE)

        if (query) {
            susciptions = susciptions.ilike('client.name', `%${query}%`)
        }

        if (service) {
            susciptions = susciptions.eq('service', service)
        }

        if (expiration) {
            if (expiration === "UNDEFEATED") {
                susciptions = susciptions.gt('renewal_date', new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString());
            } else if (expiration === "TOEXPIRE") {
                susciptions = susciptions.gte('renewal_date', now.toISOString())
                    .lte('renewal_date', new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString())
                    .is('renewed_from_date', null);
            } else if (expiration === "EXPIRED") {
                susciptions = susciptions.lt('renewal_date', now.toISOString())
                    .is('renewed_from_date', null);
            } else if (expiration === "RENEWAL") {
                susciptions = susciptions.not('renewed_from_date', 'is', null); // Mostrar solo los que tienen renewed_from definido
            }
        }


        const { data, error } = await susciptions;

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