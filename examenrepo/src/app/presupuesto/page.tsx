
"use client";
import { useApp } from "@/context/AppContext";

export default function PresupuestoForm() {
  const { presupuesto, setPresupuesto, gastos } = useApp();
  const gastado = gastos.reduce((s, g) => s + g.monto, 0);
  const porcentaje = presupuesto ? (gastado / presupuesto) * 100 : 0;

  return (
    <section>
      <h2>Presupuesto mensual</h2>
      <input
        type="number"
        placeholder="Ingresa tu presupuesto"
        onChange={(e) => setPresupuesto(+e.target.value)}
      />
      {presupuesto > 0 && (
        <p>
          Gastado: L.{gastado} / L.{presupuesto} ({porcentaje.toFixed(1)}%)
        </p>
      )}
      {porcentaje >= 100 && (
        <div>
          Has superado el límite del presupuesto
        </div>
      )}
      {porcentaje >= 80 && porcentaje < 100 && (
        <div>Alcanzaste el 80 % del presupuesto</div>
      )}
    </section>
  );
}
