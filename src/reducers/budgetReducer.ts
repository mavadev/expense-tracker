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
	  }
	| {
			type: 'remove-expense';
			payload: Expense['id'];
	  }
	| {
			type: 'set-update-expense';
			payload: Expense['id'];
	  }
	| {
			type: 'update-expense';
			payload: Expense;
	  };

export interface BudgetState {
	budget: number;
	modal: boolean;
	expenses: Expense[];
	expenseEditID: Expense['id'];
}

export const initialState: BudgetState = {
	budget: 0,
	modal: false,
	expenses: [],
	expenseEditID: '',
};

export const budgetReducer = (
	state: BudgetState = initialState,
	action: BudgetActions
): BudgetState => {
	switch (action.type) {
		case 'add-budget':
			return { ...state, budget: action.payload };

		case 'show-modal':
			return { ...state, modal: true };

		case 'close-modal':
			return { ...state, modal: false, expenseEditID: '' };

		case 'add-expense': {
			const newExpense = { id: uuidv4(), ...action.payload };
			return {
				...state,
				modal: false,
				expenses: [...state.expenses, newExpense],
			};
		}

		case 'remove-expense':
			return {
				...state,
				expenses: state.expenses.filter(
					(expense) => expense.id != action.payload
				),
			};

		case 'set-update-expense':
			return { ...state, modal: true, expenseEditID: action.payload };

		case 'update-expense': {
			const expensesUpdated = state.expenses.map((expense) => {
				if (expense.id == action.payload.id) return action.payload;
				return expense;
			});
			return {
				...state,
				modal: false,
				expenseEditID: '',
				expenses: expensesUpdated,
			};
		}

		default:
			return state;
	}
};
