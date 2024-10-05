import { BudgetForm } from './components';

function App() {
	return (
		<>
			<header className="bg-sky-600 py-6 max-h-40">
				<h1 className="uppercase text-center font-black text-2xl text-white">
					Planificador de Gastos
				</h1>
			</header>
			<div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
				<BudgetForm />
			</div>
		</>
	);
}

export default App;
