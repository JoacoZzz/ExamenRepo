
"use client";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

export default function ListaGastos() {
  const { gastos, fetchGastos } = useApp();

  useEffect(() => {
    fetchGastos();
  }, []);

  if (!gastos.length) return <p className="p-4">No hay gastos registrados</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Categoría</th>
          <th>Monto</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map((g) => (
          <tr key={g.idgasto}>
            <td>{g.fecha}</td>
            <td>{g.categoria}</td>
            <td>L.{g.monto}</td>
            <td>{g.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
