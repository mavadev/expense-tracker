import { useMemo } from 'react';
import { Expense } from '../types';
import { formatCurrency, formatDate } from '../helpers';
import { categories } from '../data/categories';

import {
	SwipeableListItem,
	LeadingActions,
	TrailingActions,
	SwipeAction,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

interface ExpenseDetailProps {
	expense: Expense;
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
	const category = useMemo(
		() => categories.filter((category) => category.id == expense.category)[0],
		[expense.category]
	);

	const leadActions = () => (
		<LeadingActions>
			<SwipeAction onClick={() => console.log(event)}>Editar</SwipeAction>
		</LeadingActions>
	);

	const trailActions = () => (
		<TrailingActions>
			<SwipeAction onClick={console.log}>Eliminar</SwipeAction>
		</TrailingActions>
	);

	return (
		<SwipeableListItem
			maxSwipe={0.5}
			leadingActions={leadActions()}
			trailingActions={trailActions()}
		>
			<div className="bg-white shadow-lg rounded-lg p-10 w-full border-b border-gray-200 flex items-center gap-5 select-none">
				<div className="w-1/5">
					<img
						className="w-20"
						alt={`Categoría ${category.name}`}
						src={`/icono_${category.icon}.svg`}
					/>
				</div>
				<div className="space-y-2 flex-1">
					<p className="text-sm font-bold uppercase text-black">
						{category.name}
					</p>
					<p>{expense.name}</p>
					<p className="text-slate-600 text-sm">
						{formatDate(expense.date!.toString())}
					</p>
				</div>
				<p className="font-bold text-black text-2xl">
					{formatCurrency(expense.amount)}
				</p>
			</div>
		</SwipeableListItem>
	);
}
