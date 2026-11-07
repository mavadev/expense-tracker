import { useMemo, useCallback } from "react";
import { ShoppingCartIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useBudget } from "../hooks";
import { ExpenseDetail, FilterByCategory } from "../components";

export default function ExpenseList() {
  const { state, dispatch } = useBudget();

  const handleOpenModal = useCallback(() => {
    dispatch({ type: "show-modal" });
  }, [dispatch]);

  const filteredExpenses = useMemo(
    () =>
      state.currentCategory
        ? state.expenses.filter(
            (expense) => expense.category == state.currentCategory,
          )
        : state.expenses,
    [state.currentCategory, state.expenses],
  );
  const isEmpty = useMemo(() => !filteredExpenses.length, [filteredExpenses]);

  return (
    <main className="mt-5 max-w-3xl mx-auto py-10 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="font-extrabold text-2xl sm:text-3xl text-gray-800 tracking-tight">
          Listado de Gastos
        </h2>

        <FilterByCategory />
      </div>

      {isEmpty ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-gray-500 flex flex-col justify-center items-center gap-4 text-center">
          <div className="p-4 bg-sky-50 rounded-full text-sky-600">
            <ShoppingCartIcon className="w-12 h-12" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">
              No hay gastos registrados
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Comienza agregando el primer gasto con el botón superior.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2 text-sm uppercase tracking-wider shrink-0"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>Nuevo Gasto</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </main>
  );
}
