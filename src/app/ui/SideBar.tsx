import Image from "next/image";
import VoidLogo from "@/app/assets/images/logo-white.png";
import NavLinks from "./nav-link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
export default function SideBar() {
  return (
    <div className="bg-PrimaryBg h-full">
      <div className="text-white flex items-center space-x-4 p-6 h-[10%]">
        <Image src={VoidLogo} width={50} height={50} alt="VoidLogo" />
        <p className="text-xl tracking-widest">VOID</p>
      </div>
      <div className="py-4 max-2xl:px-3 px-8 h-[70%]">
        <NavLinks />
      </div>
      <div className="h-[20%] max-2xl:px-3 px-6">
        <div className="max-2xl:space-y-2 space-y-4 bg-SecondaryBg p-2 rounded-lg max-2xl:py-2 py-4">
          <div className="flex justify-center items-center">
            <PlusCircleIcon className="text-white w-10 h-10 border-black bg-PrimaryBg hover:bg-white hover:text-black p-2 rounded-full transition-all duration-700 cursor-pointer" />
          </div>
          <div className="text-white text-center text-[12px] max-2xl:text-xs">
            <p>Selecciona El Nuevo Tipo De Registro</p>
          </div>
          <div className="flex justify-center">
            <p className="max-2xl:w-[100%] w-[70%] max-2xl:text-sm border-2 border-black bg-PrimaryBg text-white text-center rounded-full py-2 px-4 hover:bg-white hover:text-black transition-all duration-700 cursor-pointer">
              Nuevo Registro
            </p>
          </div>
        </div>
      </div>
      {false ? (
        <div className="w-[500px] h-[500px] top-[30%] left-[45%] bg-red-600 z-10 absolute inset-0">
          sdasdsa
        </div>
      ) : null}
    </div>
  );
}