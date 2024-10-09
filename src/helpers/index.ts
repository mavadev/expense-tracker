export function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

export function validateForm<FormValues extends object>(form: FormValues) {
	const values = Object.values(form);
	let notErrors = true;

	values.forEach((value) => {
		if (value == null || value.length == 0 || value <= 0) notErrors = false;
	});

	return notErrors;
}
