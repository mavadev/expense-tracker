import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense } from '../types';

export type BudgetActions =
	| {
			type: 'add-budget';
			payload: number;
	  }
	| {
			type: 'show-modal';
	  }
	| {
			type: 'close-modal';
	  }
	| {
			type: 'add-expense';
			payload: DraftExpense;
	  };

export interface BudgetState {
	budget: number;
	modal: boolean;
	expenses: Expense[];
}

export const initialState: BudgetState = {
	budget: 0,
	modal: false,
	expenses: [],
};

export const budgetReducer = (
	state: BudgetState = initialState,
	action: BudgetActions
) => {
	switch (action.type) {
		case 'add-budget':
			return { ...state, budget: action.payload };

		case 'show-modal':
			return { ...state, modal: true };

		case 'close-modal':
			return { ...state, modal: false };

		case 'add-expense':
			const newExpense = { id: uuidv4(), ...action.payload };
			return {
				...state,
				modal: false,
				expenses: [...state.expenses, newExpense],
			};

		default:
			return state;
	}
};
