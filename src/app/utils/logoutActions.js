// src/app/utils/logoutAction.js
'use server'

import { createClient } from "../utils/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/"); // Esto maneja la redirección después de cerrar sesión
}
