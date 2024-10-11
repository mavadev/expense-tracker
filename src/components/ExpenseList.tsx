import { useMemo } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useBudget } from '../hooks';
import { ExpenseDetail, FilterByCategory } from '../components';

export default function ExpenseList() {
	const { state } = useBudget();

	const filteredExpenses = useMemo(
		() =>
			state.currentCategory
				? state.expenses.filter(
						(expense) => expense.category == state.currentCategory
				  )
				: state.expenses,
		[state.currentCategory, state.expenses]
	);
	const isEmpty = useMemo(() => !filteredExpenses.length, [filteredExpenses]);

	return (
		<div className="mt-5">
			<div className="flex justify-between items-center mb-5">
				<h2 className="font-bold text-2xl mb-5">Lista de Gastos</h2>
				<FilterByCategory />
			</div>
			{isEmpty ? (
				<div className="text-gray-700 flex flex-col justify-center items-center gap-3 py-5">
					<ShoppingCartIcon width={50} />
					<p className="text-2xl font-bold">No hay gastos</p>
				</div>
			) : (
				filteredExpenses.map((expense) => (
					<ExpenseDetail
						key={expense.id}
						expense={expense}
					/>
				))
			)}
		</div>
	);
}
