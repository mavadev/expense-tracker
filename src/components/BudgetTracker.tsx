import { useCallback, useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useBudget } from '../hooks';
import { AmountDisplay } from '../components';

export default function BudgetTracker() {
	const { state, totalExpenses, totalRemaining, dispatch } = useBudget();

	const percentage = useMemo(
		() => +((totalExpenses / state.budget) * 100).toFixed(1),
		[totalExpenses, state.budget]
	);

	const handleResetApp = useCallback(
		() => dispatch({ type: 'reset-app' }),
		[dispatch]
	);

	return (
		<section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<div>
					<CircularProgressbar
						value={percentage}
						styles={buildStyles({
							pathColor: '#3B82F6',
							trailColor: '#DEDEDE',
						})}
						text={`${percentage}%`}
					/>
				</div>
				<div className="flex flex-col justify-center gap-3">
					<AmountDisplay
						title="Presupuesto"
						amount={state.budget}
					/>
					<AmountDisplay
						title="Disponible"
						amount={totalRemaining}
					/>
					<AmountDisplay
						title="Gastado"
						amount={totalExpenses}
					/>
					<button
						type="button"
						onClick={handleResetApp}
						className="bg-pink-600 w-full p-3 text-white uppercase font-bold rounded-lg mt-3"
					>
						Limpiar Presupuesto
					</button>
				</div>
			</div>
		</section>
	);
}
