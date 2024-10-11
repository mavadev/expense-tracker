import { useMemo } from 'react';
import { Expense } from '../types';
import { formatCurrency, formatDate } from '../helpers';
import { categories } from '../data/categories';

import {
	SwipeableListItem,
	LeadingActions,
	TrailingActions,
	SwipeAction,
	SwipeableList,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from '../hooks';

interface ExpenseDetailProps {
	expense: Expense;
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
	const { dispatch } = useBudget();

	const category = useMemo(
		() => categories.filter((category) => category.id == expense.category)[0],
		[expense.category]
	);

	const leadActions = () => (
		<LeadingActions>
			<SwipeAction
				onClick={() =>
					dispatch({ type: 'set-update-expense', payload: expense.id })
				}
			>
				Actualizar
			</SwipeAction>
		</LeadingActions>
	);

	const trailActions = () => (
		<TrailingActions>
			<SwipeAction
				destructive={true}
				onClick={() =>
					dispatch({ type: 'remove-expense', payload: expense.id })
				}
			>
				Eliminar
			</SwipeAction>
		</TrailingActions>
	);

	return (
		<SwipeableList>
			<SwipeableListItem
				leadingActions={leadActions()}
				trailingActions={trailActions()}
				className="mb-5 shadow-lg rounded-lg select-none"
			>
				<div className="bg-white p-10 w-full border-b border-gray-200 flex items-center gap-5 ">
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
		</SwipeableList>
	);
}
