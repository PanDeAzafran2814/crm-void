'use client'
 
import { ArrowDownOnSquareStackIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useFormStatus } from 'react-dom'

const ICONS = {
    none: ArrowDownOnSquareStackIcon,
    error: ExclamationTriangleIcon,
  };
  
  const TITTLES = {
    none: "Guardar",
    error: "Error",
  };

export function SubmitButton({state,}:{state: 'none' | 'error';}) {
  const { pending } = useFormStatus();
  const Icon = ICONS[state] || ArrowDownOnSquareStackIcon;
  const Tittle = TITTLES[state] || "Guardar";
    
  return (
        <button 
            type="submit"
            disabled={pending}
            className="flex space-x-1 text-white bg-PrimaryBg hover:bg-SecondaryBg focus:ring-4 focus:outline-none focus:ring-PrimaryAct font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-500 cursor-pointer">
                {
                    pending?
                    <ArrowPathIcon  className="text-white w-5 h-5 animate-spin"/>
                    :
                    <Icon className="text-white w-5 h-5"/>
                }
                <p>{pending? "Guardando..." : Tittle}</p>
        </button>
  )
}