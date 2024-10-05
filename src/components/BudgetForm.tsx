import { ChangeEvent, useMemo, useState } from 'react';

export default function BudgetForm() {
	const [budget, setBudget] = useState(0);

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setBudget(target.valueAsNumber);
	};

	const notIsValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

	return (
		<form className="space-y-6">
			<label
				htmlFor="budget"
				className="text-3xl text-sky-600 font-bold text-center block"
			>
				Definir Presupuesto
			</label>
			<input
				id="budget"
				type="number"
				name="budget"
				value={budget}
				onChange={handleChange}
				placeholder="Define tu presupuesto"
				className="w-full bg-white border border-gray-200 p-2"
			/>

			<input
				type="submit"
				disabled={notIsValid}
				value="Guardar Presupuesto"
				className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-50 disabled:cursor-default"
			/>
		</form>
	);
}
