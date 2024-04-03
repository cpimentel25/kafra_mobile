export default function formatNumberToCurrency(number: number): string {
  // Primero, asegurémonos de que el número sea un número válido
  if (isNaN(number)) {
    throw new Error("El valor proporcionado no es un número válido.");
  }

  // Convertir el número a una cadena con formato de moneda
  const formattedNumber: string = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // Establecer el número mínimo de dígitos decimales a 0
  }).format(number);

  return formattedNumber;
}
