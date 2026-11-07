import { ChangeEvent, useState } from 'react';

export default function useForm<FormType extends object>(
	initialForm: FormType
) {
	const [formState, setFormState] = useState(initialForm);

	const handleChange = ({
		target,
	}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = target;

		setFormState({
			...formState,
			[name]: Number.parseInt(value) ? +value : value,
		});
	};

	const resetForm = () => {
		setFormState(initialForm);
	};

	return {
		...formState,
		formState,
		handleChange,
		resetForm,
		setFormState,
	};
}
