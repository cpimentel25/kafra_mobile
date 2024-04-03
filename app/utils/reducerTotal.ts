import { DataInterface } from "../interfaces/data.interface";

export default function sumValues(items: DataInterface[]): number {
  return items.reduce((accumulator, currentItem) => {
    // Verificar si currentItem.Value es un número válido
    const numericValue = Number(currentItem.Value);
    if (isNaN(numericValue)) {
      throw new Error("El valor proporcionado no es un número válido.");
    }

    // Sumar numericValue al acumulador
    return accumulator + numericValue;
  }, 0);
}
