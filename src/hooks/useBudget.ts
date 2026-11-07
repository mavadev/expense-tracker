import { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';

export default function useBudget() {
	const { state, dispatch, totalExpenses, totalRemaining } =
		useContext(BudgetContext);
	if (!state) throw new Error('useBudget must be used within a BudgetProvider');
	return { state, dispatch, totalExpenses, totalRemaining };
}
