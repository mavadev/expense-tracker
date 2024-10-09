export type Category = {
	id: string;
	name: string;
	icon: string;
};

type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export type Expense = {
	id: string;
	name: string;
	amount: number;
	category: string;
	date: DateValue;
};

export type DraftExpense = Omit<Expense, 'id'>;
