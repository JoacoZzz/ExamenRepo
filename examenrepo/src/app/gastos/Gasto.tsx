
"use client";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

export default function GastoForm() {
  const { addGasto, categorias, addCategoria } = useApp();
  const [nuevoCat, setNuevoCat] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget as HTMLFormElement);
    await addGasto({
      categoria: d.get("cat") as string,
      monto: Number(d.get("monto")),
      fecha: d.get("fecha") as string,
      descripcion: d.get("desc") as string,
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="monto" placeholder="Monto" type="number" required />
      <select name="cat">
        {categorias.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <div>
        <input
          value={nuevoCat}
          onChange={(e) => setNuevoCat(e.target.value)}
          placeholder="Nueva categoría"
        />
        <button
          type="button"
          onClick={() => {
            if (nuevoCat) addCategoria(nuevoCat);
            setNuevoCat("");
          }}
          className="btn bg-green-500 text-white p-2 rounded"
        >
          +
        </button>
      </div>

      <input name="desc" placeholder="Descripción"/>
      <input name="fecha" type="date"required/>
      <button>Guardar gasto</button>
    </form>
  );
}
