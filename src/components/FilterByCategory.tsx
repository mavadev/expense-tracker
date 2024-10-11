import { ChangeEvent, useCallback } from 'react';
import { categories } from '../data/categories';
import { useBudget } from '../hooks';

export default function FilterByCategory() {
	const { state, dispatch } = useBudget();

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) =>
			dispatch({ type: 'set-filter-category', payload: +event.target.value }),
		[dispatch]
	);

	return (
		<div>
			<form>
				<div className="flex flex-col md:flex-row md:items-center gap-5 justify-end">
					<label
						htmlFor="category"
						className="text-xl"
					>
						Filtrar por:{' '}
					</label>
					<select
						id="category"
						onChange={handleChange}
						value={state.currentCategory}
						className="bg-slate-100 font-bold p-3 rounded border-2 text-gray-800 border-gray-800"
					>
						<option value={0}>Todos</option>
						{categories.map((category) => (
							<option
								key={category.id}
								value={category.id}
							>
								{category.name}
							</option>
						))}
					</select>
				</div>
			</form>
		</div>
	);
}
