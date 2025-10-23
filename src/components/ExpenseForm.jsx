import { useState } from "react";

export default function ExpenseForm({ onAdd, categories }) {
  const [form, setForm] = useState({ description: "", amount: "", category: categories[0] || "Other", date: new Date().toISOString().slice(0, 10) });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.description.trim()) {
      setError("Please enter a description.");
      return;
    }

    const amt = Number(form.amount);
    if (Number.isNaN(amt) || amt <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    onAdd({ ...form, amount: amt });
    setForm({ description: "", amount: "", category: categories[0] || "Other", date: new Date().toISOString().slice(0, 10) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g., Coffee, Bus ticket"
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
      >
        Add Expense
      </button>
    </form>
  );
}
