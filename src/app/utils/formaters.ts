// utils/formatCurrency.ts
export function formatCurrency(value: string | number) {
    // Convertir a número si es un string
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    // Verificar si es un número válido
    if (isNaN(numericValue)) {
        throw new Error("El valor proporcionado no es un número válido.");
    }

    const formatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN", // Cambia "MXN" por la moneda deseada
        minimumFractionDigits: 2, // Asegura que siempre haya dos decimales
        maximumFractionDigits: 2,
    });

    return formatter.format(numericValue);
}
