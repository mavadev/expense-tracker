import { createContext, Dispatch } from 'react';
import { BudgetState, BudgetActions } from '../reducers/budgetReducer';

interface BudgetContextProps {
	state: BudgetState;
	dispatch: Dispatch<BudgetActions>;
	totalExpenses: number;
	totalRemaining: number;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);
