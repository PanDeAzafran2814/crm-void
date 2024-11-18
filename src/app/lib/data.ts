'use server'

import { createClient } from "../utils/server";


export async function fetchClients() {
    const supabase = createClient();
    try {
        const clients = await supabase
            .from('clients')
            .select()
            .order('association_date', { ascending: false })
        await new Promise((resolve) => setTimeout(resolve, 5000));

        return clients.data

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

const ITEMS_PER_PAGE = 10;
export async function FetchClientsFiltered(
    query: string,
    currentPage: number,
    location: string,
    status?: string
) {
    const supabase = createClient();
    const LimitPerPage = location === "clients" ? ITEMS_PER_PAGE : 5;
    const offset = (currentPage - 1) * LimitPerPage;
    const filters = query.split(' ').map(q => `name.ilike.%${q}%,contact_email.ilike.%${q}%,contact_city.ilike.%${q}%,contact_state.ilike.%${q}%`).join(',');
    try {
        let clients = supabase
            .from('clients')
            .select(`
            id,
            name, 
            client_logo,
            contact_email,
            contact_phone,
            contact_city,
            enable,
            association_date
            `)
            .or(filters)
            .not('visible', 'eq', false)
            .order('association_date', { ascending: false })
            .range(offset, offset + LimitPerPage - 1)
            .limit(LimitPerPage)

        if (status) {
            const enableValue = status === "ACTIVE"; // Convertir el filtro de texto a booleano
            clients = clients.eq('enable', enableValue);
        }

        const { data, error } = await clients;

        if (error) {
            console.error("Database Error:", error);
            throw new Error('Failed To Fetch Data');
        }

        return data

    } catch (error) {
        console.error("Database Error:", error)
        throw new Error('Failed To Fetch Data')
    }
}

export async function CountClientsFiltered(
    query: string,
    status?: string
) {
    const supabase = createClient();
    const filters = query.split(' ').map(q => `name.ilike.%${q}%,contact_email.ilike.%${q}%,contact_city.ilike.%${q}%,contact_state.ilike.%${q}%`).join(',');

    try {
        let clients = supabase
            .from('clients')
            .select('*', { count: 'exact', head: true })
            .or(filters)
            .not('visible', 'eq', false);

        // Aplicar filtro por estado si existe
        if (status) {
            const enableValue = status === "ACTIVE"; // Convertir el filtro de texto a booleano
            clients = clients.eq('enable', enableValue);
        }

        const { count, error } = await clients;

        if (error) {
            console.error("Database Error:", error);
            throw new Error('Failed To Fetch Data');
        }


        return Math.ceil(Number(count || 0) / ITEMS_PER_PAGE); // Retorna solo el número de registros que coinciden

    } catch (error) {
        console.error("Database Error:", error);
        //throw new Error('Failed To Fetch Data');
        return 0;
    }
}

export async function CountDashboardClientCard() {
    const supabase = createClient();
    try {
        // Consulta para contar clientes con enable = true
        const totalEnabled = await supabase
            .from('clients')
            .select('id', { count: 'exact', head: true })
            .eq('enable', true)
            .not('visible', 'eq', false);

        // Consulta para contar clientes con enable = false
        const totalDisabled = await supabase
            .from('clients')
            .select('id', { count: 'exact', head: true })
            .eq('enable', false)
            .not('visible', 'eq', false);

        const enabledCount = totalEnabled.count ?? 0;
        const disabledCount = totalDisabled.count ?? 0;
        const totalCount = enabledCount + disabledCount;

        // Calcular los porcentajes
        const percentEnabled = totalCount > 0 ? parseFloat((enabledCount / totalCount * 100).toFixed(2)) : 0;
        const percentDisabled = totalCount > 0 ? parseFloat((disabledCount / totalCount * 100).toFixed(2)) : 0;

        console.log({
            totalcount: totalCount,
            totalEnabled: enabledCount,
            totalDisabled: disabledCount,
            percentEnabled,
            percentDisabled
        })

        return {
            totalcount: totalCount,
            totalEnabled: enabledCount,
            totalDisabled: disabledCount,
            percentEnabled,
            percentDisabled
        };

    } catch (error) {
        console.error("Database Error:", error);
        throw new Error('Failed to fetch data');
    }
}