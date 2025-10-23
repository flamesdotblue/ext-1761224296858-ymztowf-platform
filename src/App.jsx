import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import Summary from "./components/Summary";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Housing",
  "Entertainment",
  "Health",
  "Shopping",
  "Education",
  "Other",
];

const STORAGE_KEY = "expense-tracker:v1";

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to read from localStorage", e);
      return [];
    }
  });

  const [filters, setFilters] = useState({
    category: "All",
    query: "",
    from: "",
    to: "",
    sort: "newest",
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      {
        id: crypto.randomUUID(),
        ...expense,
        amount: Number(expense.amount),
        date: expense.date || new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    if (filters.category && filters.category !== "All") {
      result = result.filter((e) => e.category === filters.category);
    }

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (e) =>
          e.description.toLowerCase().includes(q) ||
          String(e.amount).includes(q)
      );
    }

    if (filters.from) {
      result = result.filter((e) => e.date >= filters.from);
    }

    if (filters.to) {
      result = result.filter((e) => e.date <= filters.to);
    }

    if (filters.sort === "newest") {
      result.sort((a, b) => (a.date < b.date ? 1 : -1));
    } else if (filters.sort === "oldest") {
      result.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else if (filters.sort === "amountAsc") {
      result.sort((a, b) => a.amount - b.amount);
    } else if (filters.sort === "amountDesc") {
      result.sort((a, b) => b.amount - a.amount);
    }

    return result;
  }, [expenses, filters]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 md:sticky md:top-6">
              <h2 className="text-lg font-semibold mb-3">Add Expense</h2>
              <ExpenseForm categories={DEFAULT_CATEGORIES} onAdd={addExpense} />
              <div className="mt-6">
                <h3 className="text-base font-semibold mb-2">Filters</h3>
                <Filters
                  categories={["All", ...DEFAULT_CATEGORIES]}
                  value={filters}
                  onChange={setFilters}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Summary expenses={filteredExpenses} />
            <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
}
