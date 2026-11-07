import { formatCurrency } from '../helpers';

interface AmountDisplayProps {
	title: string;
	amount: number;
}

export default function AmountDisplay({ title, amount }: AmountDisplayProps) {
	return (
		<p className="text-xl text-sky-700 font-bold flex justify-between">
			{title.toUpperCase()}:{' '}
			<span className="font-bold text-black">{formatCurrency(amount)}</span>
		</p>
	);
}
