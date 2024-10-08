import { createClient } from "@/app/utils/server";

export default async function Clients() {

    const supabase = createClient()

    const { data: clients} = await supabase.from("clients").select()

    return (
      <div className="overflow-y-auto h-full w-full">
          clients
          <br />
          <pre>
            {JSON.stringify(clients, null, 2)}
          </pre>
      </div>
    );
  }
  