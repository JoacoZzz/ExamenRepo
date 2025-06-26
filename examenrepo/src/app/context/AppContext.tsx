"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface Gasto {
  idgasto?: number;
  categoria: string;
  monto: number;
  fecha: string;
  descripcion?: string;
}

interface AppState {
  auth: boolean;
  login: (u: string, p: string) => boolean;
  presupuesto: number;
  setPresupuesto: (v: number) => void;
  gastos: Gasto[];
  addGasto: (g: Gasto) => Promise<void>;
  fetchGastos: () => Promise<void>;
  categorias: string[];
  addCategoria: (c: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([
    "Comida",
    "Transporte",
    "Entretenimiento",
  ]);

  const fetchGastos = async () => {
    const r = await fetch("http://localhost:5000/gasto");
    setGastos(await r.json());
  };

  const addGasto = async (g: Gasto) => {
    await fetch("http://localhost:5000/gasto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(g),
    });
    fetchGastos();
  };

  const login = (u: string, p: string) => {
    const ok = u === "admin" && p === "admin123";
    setAuth(ok);
    return ok;
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        login,
        presupuesto,
        setPresupuesto,
        gastos,
        addGasto,
        fetchGastos,
        categorias,
        addCategoria: (c) => setCategorias([...categorias, c]),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext)!;
