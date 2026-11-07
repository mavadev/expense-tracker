import { useState, ChangeEvent, FormEvent, useMemo, FocusEvent } from "react";
import { useBudget } from "../hooks";

export default function BudgetForm() {
  const { dispatch } = useBudget();
  const [budget, setBudget] = useState(0);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.value) return setBudget(0);
    setBudget(target.valueAsNumber);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch({ type: "add-budget", payload: budget });
  };

  const notIsValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-2xl p-8 sm:p-12 border border-gray-100 transition-all">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-center space-y-2">
            <span className="bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
              Paso inicial
            </span>
            <label
              htmlFor="budget"
              className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight block pt-2"
            >
              Definir Presupuesto
            </label>
            <p className="text-gray-500 text-sm">
              Ingresa tu límite disponible para comenzar a planificar tus
              gastos.
            </p>
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 font-bold text-lg">
              $
            </span>
            <input
              min={0}
              id="budget"
              type="number"
              name="budget"
              value={budget}
              onChange={handleChange}
              onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3.5 pl-9 pr-4 text-gray-800 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <input
            type="submit"
            disabled={notIsValid}
            value="Definir Presupuesto"
            className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full py-4 rounded-xl text-white font-bold uppercase tracking-wider text-sm shadow-lg shadow-sky-600/30 transition-all disabled:opacity-50 disabled:cursor-default disabled:shadow-none"
          />
        </form>
      </div>
    </div>
  );
}
