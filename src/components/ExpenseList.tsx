import { useMemo } from 'react';
import { useBudget } from '../hooks';
import { ExpenseDetail } from '../components';

export default function ExpenseList() {
	const { state } = useBudget();
	const isEmpty = useMemo(() => !state.expenses.length, [state.expenses]);

	if (isEmpty)
		return (
			<div className="mt-5">
				<p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
			</div>
		);

	return (
		<div className="mt-5">
			<h2 className="font-bold text-2xl mb-5">Listado de Gastos</h2>
			{state.expenses.map((expense) => (
				<ExpenseDetail
					key={expense.id}
					expense={expense}
				/>
			))}
		</div>
	);
}
