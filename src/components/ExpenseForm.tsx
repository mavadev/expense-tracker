import { FormEvent, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { useBudget, useForm } from '../hooks';
import { DateValue, DraftExpense } from '../types';
import { formatCurrency, validateForm } from '../helpers';
import { categories } from '../data/categories';

export default function ExpenseForm() {
	const {
		formState: expense,
		setFormState: setExpense,
		handleChange,
	} = useForm<DraftExpense>({
		name: '',
		amount: 0,
		category: 0,
		date: new Date(),
	});

	const [error, setError] = useState<string | null>(null);
	const [prevAmount, setPrevAmount] = useState(0);
	const { state, dispatch, totalRemaining } = useBudget();

	const remaining = useMemo(
		() => totalRemaining + prevAmount,
		[prevAmount, totalRemaining]
	);

	useEffect(() => {
		if (!state.expenseEditID) return;

		const expenseEdit = state.expenses.filter(
			(expense) => expense.id == state.expenseEditID
		)[0];
		setExpense(expenseEdit);
		setPrevAmount(expenseEdit.amount);
	}, [state.expenseEditID]);

	const handleChangeDate = (value: DateValue) => {
		setExpense({ ...expense, date: value });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Validar campos de form
		if (!validateForm(expense)) {
			setError('Todos los campos son obligatorios');
			return;
		}
		// Validar que el gasto no supere el presupuesto restante
		if (expense.amount > remaining) {
			setError('El gasto excede el presupuesto restante');
			return;
		}
		// Agregamos el gasto
		setError(null);
		if (state.expenseEditID) {
			dispatch({
				type: 'update-expense',
				payload: { ...expense, id: state.expenseEditID },
			});
			return;
		}
		dispatch({ type: 'add-expense', payload: expense });
	};

	return (
		<form
			className="space-y-6"
			onSubmit={handleSubmit}
		>
			<legend className="uppercase text-center text-2xl font-bold py-2 flex flex-col gap-2">
				<span>{state.expenseEditID ? 'Actualizar' : 'Nuevo'} Gasto</span>
				<span className="text-green-800">
					Disponible: {formatCurrency(remaining)}
				</span>
			</legend>

			{error && (
				<p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
					{error}
				</p>
			)}

			<div className="flex items-center justify-stretch gap-2">
				<label
					htmlFor="name"
					className="text-lg min-w-20"
				>
					Nombre:{' '}
				</label>
				<input
					id="name"
					type="text"
					name="name"
					value={expense.name}
					onChange={handleChange}
					placeholder="Añade el nombre del gasto"
					className="bg-slate-100 p-2 flex-1 border-gray-300 border-2 rounded"
				/>
			</div>
			<div className="flex items-center justify-stretch gap-2">
				<label
					htmlFor="amount"
					className="text-lg min-w-20"
				>
					Monto:{' '}
				</label>
				<input
					id="amount"
					type="number"
					name="amount"
					value={expense.amount}
					onChange={handleChange}
					placeholder="Añade la cantidad del gasto ej.300"
					className="bg-slate-100 p-2 flex-1 border-gray-300 border-2 rounded"
				/>
			</div>
			<div className="flex items-center justify-stretch gap-2">
				<label
					htmlFor="category"
					className="text-lg min-w-20"
				>
					Categoria:{' '}
				</label>
				<select
					id="category"
					name="category"
					onChange={handleChange}
					value={expense.category}
					className="bg-slate-100 p-2 flex-1 border-gray-300 border-2 rounded"
				>
					<option
						disabled
						value={0}
					>
						-- SELECCIONE LA CATEGORIA --
					</option>
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
			<div className="flex items-center justify-stretch gap-2">
				<label
					htmlFor="date"
					className="text-lg min-w-20"
				>
					Fecha:{' '}
				</label>
				<DatePicker
					id="date"
					name="date"
					value={expense.date}
					onChange={handleChangeDate}
					className="bg-slate-100 p-2 border-0"
				/>
			</div>
			<input
				type="submit"
				value={state.expenseEditID ? 'Guardar Cambios' : 'Registrar'}
				className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded"
			/>
		</form>
	);
}
