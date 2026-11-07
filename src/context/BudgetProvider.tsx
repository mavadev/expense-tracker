import { ReactNode, useMemo, useReducer } from 'react';
import { BudgetContext } from './BudgetContext';
import { budgetReducer, initialState } from '../reducers/budgetReducer';

interface BudgetProviderProps {
	children: ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
	const [state, dispatch] = useReducer(budgetReducer, initialState);

	const totalExpenses = useMemo(
		() => state.expenses.reduce((total, expense) => expense.amount + total, 0),
		[state.expenses]
	);
	const totalRemaining = useMemo(
		() => state.budget - totalExpenses,
		[state.budget, totalExpenses]
	);

	return (
		<BudgetContext.Provider
			value={{ state, dispatch, totalExpenses, totalRemaining }}
		>
			{children}
		</BudgetContext.Provider>
	);
};
