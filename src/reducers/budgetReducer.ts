export type BudgetActions =
	| {
			type: 'add-budget';
			payload: number;
	  }
	| {
			type: 'remove-budget';
			payload: number;
	  };

export interface BudgetState {
	budget: number;
}

export const initialState: BudgetState = {
	budget: 0,
};

export const budgetReducer = (
	state: BudgetState = initialState,
	action: BudgetActions
) => {
	switch (action.type) {
		case 'add-budget':
			console.log('addddddddddd');
			return { ...state, budget: action.payload };

		default:
			return state;
	}
};
