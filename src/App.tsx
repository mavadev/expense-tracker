import { useEffect, useMemo } from "react";
import { useBudget } from "./hooks";
import {
  BudgetForm,
  BudgetTracker,
  ExpenseModal,
  ExpenseList,
} from "./components";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.budget, state.expenses]);

  return (
    <>
      <header className="bg-sky-600 py-6 max-h-40">
        <h1 className="uppercase text-center font-black text-2xl text-white">
          Planificador de Gastos
        </h1>
      </header>
      {!isValidBudget ? (
        <BudgetForm />
      ) : (
        <>
          <BudgetTracker />
          <ExpenseList />
          <ExpenseModal />
        </>
      )}
    </>
  );
}

export default App;
