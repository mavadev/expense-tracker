# Expense Tracker 💰

### 📖 Descripción

**Expense Tracker** es una aplicación web moderna e intuitiva desarrollada con **React, TypeScript y Tailwind CSS** que permite llevar un control y planificación financiera de gastos diarios. Incorpora un sistema dinámico de gestión presupuestaria con indicador de progreso visual, filtrado por categorías y un modal interactivo para agregar o editar transacciones en tiempo real.

---

### 🧪 Vista Previa de la Interfaz

<p align="center">
  <img alt="Expense Tracker Interface" src="https://github.com/user-attachments/assets/13772b1a-befb-4941-a423-13b0e79d6234" />
</p>

> Interfaz limpia con soporte para definir presupuestos, registrar gastos y monitorear montos consumidos y disponibles en tiempo real.

---

### ✨ Características

- 📊 **Monitoreo de Presupuesto:** Indicador circular de progreso que muestra gráficamente la proporción consumida y el saldo restante.
- 🏷️ **Categorización Dinámica:** Clasificación de transacciones (Ahorro, Comida, Casa, Gastos Varios, Ocio, Salud, Suscripciones) y filtrado por categoría.
- ✏️ **Gestión Completa (CRUD Local):** Creación, edición y eliminación de gastos mediante useReducer y Context API para un manejo global de estado.
- 📅 **Selección de Fechas:** Integración de componentes de fecha personalizados para asignar temporalidad a cada gasto.
- 💾 **Persistencia Automática:** Sincronización instantánea de presupuestos y transacciones en el localStorage.
- 👁️ **Modal Interactivo:** Modal accesible con backdrop difuminado (backdrop-blur) y animaciones para la captura de información.

---

### 🏗️ Arquitectura del proyecto

La aplicación sigue una arquitectura modular y escalable en React dividida por responsabilidades:

```text
src/
├── components/   # Componentes UI (BudgetForm, BudgetTracker, ExpenseForm, ExpenseList, ExpenseModal, etc.)
├── context/      # Contexto global de React para presupuesto y gastos (BudgetContext, BudgetProvider)
├── data/         # Categorías predefinidas e información estática
├── helpers/      # Funciones utilitarias (Formato de moneda, fechas y validaciones)
├── hooks/        # Custom Hooks (useBudget, useForm)
├── reducers/     # Lógica centralizada del estado de la aplicación (budgetReducer)
└── types/        # Definiciones de tipos e interfaces TypeScript (Expense, Category, BudgetActions)
```

---

### 💻 Instalación local

**1. Clona el repositorio:**

```bash
git clone https://github.com/mavadev/expense-tracker.git
cd expense-tracker
```

**2. Instala las dependencias:**

```bash
npm install
```

**3. Ejecuta el servidor de desarrollo:**

```bash
npm run dev
```

**4. La aplicación estará disponible en: `http://localhost:5173`**

---

### 🌐 Despliegue & Producción

El proyecto está optimizado para desplegarse fácilmente en plataformas como **Netlify** o **Vercel**.

**Stack del Proyecto:**

[![Stack](https://skillicons.dev/icons?i=react,ts,tailwind,vite)](https://skillicons.dev)

---

### 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

Desarrollado con ❤️ por **Gianmarco Chistama**
