import { AmountDisplay } from '../components';
import { useBudget } from '../hooks';

export default function BudgetTracker() {
	const { state, totalExpenses, totalRemaining } = useBudget();

	return (
		<section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<div className="flex justify-center">
					<img
						src="/grafico.jpg"
						alt="Grafico de Gastos"
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
						className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg mt-3"
					>
						Resetear App
					</button>
				</div>
			</div>
		</section>
	);
}
