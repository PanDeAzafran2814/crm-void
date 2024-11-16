'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type SelectFilterProps = {
  options: Record<string, string>; // Objeto con opciones (value -> texto)
  paramName: string; // Nombre del parámetro en la URL
  placeholder?: string; // Texto opcional para mostrar como valor predeterminado
};

export default function SelectFilter({ options, paramName, placeholder }: SelectFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    params.set('page', '1'); // Reiniciar paginación

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="select-basic h-10 w-60"
      onChange={(event) => handleChange(event.target.value)}
      defaultValue={searchParams.get(paramName) || ''}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {Object.entries(options).map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}
