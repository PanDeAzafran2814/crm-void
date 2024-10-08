// src/app/components/LogOutBtn.js
'use client'

import { signOut } from "@/app/utils/logoutActions";

export default function LogOutBtn() {

    return (
      <>
        <button onClick={() => signOut()}>Cerrar Sesión</button>
      </>
    );
}
