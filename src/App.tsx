import { useMemo } from 'react';
import { useBudget } from './hooks';
import { BudgetForm, BudgetTracker } from './components';

function App() {
	const { state } = useBudget();

	const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

	return (
		<>
			<header className="bg-sky-600 py-6 max-h-40">
				<h1 className="uppercase text-center font-black text-2xl text-white">
					Planificador de Gastos
				</h1>
			</header>
			<div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
				{isValidBudget ? <BudgetTracker /> : <BudgetForm />}
			</div>
		</>
	);
}

export default App;
