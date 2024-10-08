import { LockClosedIcon, UserIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import VoidLogo from "@/app/assets/images/logo-white.png";
import { login } from "./actions";
import { createClient } from "./utils/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser();
  if(!error || data?.user){
    redirect("/dashboard");
  }


  return (
    <div className="w-full h-screen flex justify-center items-center bg-login">
      <form>
        <div className="flex justify-center mb-6">
          <Image
            className="bg-[#313131] rounded-full p-4"
            src={VoidLogo}
            width={200}
            height={200}
            alt="void logo"
          />
        </div>
        <div className="space-y-6">
          <div className="w-[40vh] p-2 space-x-2 rounded-sm">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Usuario
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <UserIcon className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="text"
                name="email"
                className="outline-none rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="user@mail.com"
              />
            </div>
          </div>
          <div className="w-[40vh] p-2 space-x-2 rounded-sm">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contraseña
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <LockClosedIcon className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="password"
                name="password"
                className="outline-none rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="******"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              formAction={login}
              type="submit"
              className="text-black bg-white w-[35vh] p-2 rounded-sm font-medium	"
            >
              Iniciar Sesion
            </button>
          </div>
          <div className="flex justify-end text-white">
            <p>Olvidaste Tu Contraseña?</p>
          </div>
        </div>
      </form>
    </div>
  );
}
