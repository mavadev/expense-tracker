import { FormEvent, useEffect, useMemo, useState } from "react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useBudget, useForm } from "../hooks";
import { DateValue, DraftExpense } from "../types";
import { formatCurrency, validateForm } from "../helpers";
import { categories } from "../data/categories";

export default function ExpenseForm() {
  const {
    formState: expense,
    setFormState: setExpense,
    handleChange,
  } = useForm<DraftExpense>({
    name: "",
    amount: 0,
    category: 0,
    date: new Date(),
  });

  const [error, setError] = useState<string | null>(null);
  const [prevAmount, setPrevAmount] = useState(0);
  const { state, dispatch, totalRemaining } = useBudget();

  const remaining = useMemo(
    () => totalRemaining + prevAmount,
    [prevAmount, totalRemaining],
  );

  useEffect(() => {
    if (!state.expenseEditID) return;

    const expenseEdit = state.expenses.filter(
      (expense) => expense.id == state.expenseEditID,
    )[0];
    setExpense(expenseEdit);
    setPrevAmount(expenseEdit.amount);
  }, [state.expenseEditID, setExpense, state.expenses]);

  const handleChangeDate = (value: DateValue) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validar campos de form
    if (!validateForm(expense)) {
      setError("Todos los campos son obligatorios");
      return;
    }
    // Validar que el gasto no supere el presupuesto restante
    if (expense.amount > remaining) {
      setError("El gasto excede el presupuesto restante");
      return;
    }
    // Agregamos el gasto
    setError(null);
    if (state.expenseEditID) {
      dispatch({
        type: "update-expense",
        payload: { ...expense, id: state.expenseEditID },
      });
      return;
    }
    dispatch({ type: "add-expense", payload: expense });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="text-center space-y-2 border-b border-gray-100 pb-5">
        <legend className="uppercase text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight block">
          {state.expenseEditID ? "Actualizar Gasto" : "Nuevo Gasto"}
        </legend>
        <p className="font-medium text-emerald-600 bg-emerald-50 py-1.5 px-4 rounded-full inline-block">
          Disponible:{" "}
          <span className="font-bold">{formatCurrency(remaining)}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl">
          <p className="text-red-700 font-semibold text-sm text-center uppercase">
            {error}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-bold text-gray-700 uppercase tracking-wider block"
        >
          Nombre del Gasto:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={expense.name}
          onChange={handleChange}
          placeholder="Ej. Comida, Alquiler, Cine..."
          className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3.5 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="amount"
          className="text-sm font-bold text-gray-700 uppercase tracking-wider block"
        >
          Cantidad / Monto:
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 font-bold">
            $
          </span>
          <input
            id="amount"
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            placeholder="Ej. 300"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3.5 pl-9 pr-4 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="category"
          className="text-sm font-bold text-gray-700 uppercase tracking-wider block"
        >
          Categoría:
        </label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={expense.category}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3.5 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-sm cursor-pointer"
        >
          <option disabled value={0}>
            -- Seleccione una categoría --
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="date"
          className="text-sm font-bold text-gray-700 uppercase tracking-wider block"
        >
          Fecha del Gasto:
        </label>
        <div className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 flex items-center shadow-sm focus-within:ring-2 focus-within:ring-sky-500 transition-all">
          <DatePicker
            id="date"
            name="date"
            value={expense.date}
            onChange={handleChangeDate}
            className="w-full bg-transparent text-gray-800 font-medium cursor-pointer border-none"
          />
        </div>
      </div>

      <input
        type="submit"
        value={state.expenseEditID ? "Guardar Cambios" : "Registrar Gasto"}
        className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full py-4 rounded-xl text-white font-bold uppercase tracking-wider text-sm shadow-lg shadow-sky-600/30 transition-all active:scale-[0.99]"
      />
    </form>
  );
}
