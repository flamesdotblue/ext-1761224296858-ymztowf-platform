function formatCurrency(value) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value ?? 0);
  } catch {
    return `$${Number(value ?? 0).toFixed(2)}`;
  }
}

export default function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 text-center text-slate-600">
        No expenses to show.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left font-semibold px-4 py-3">Date</th>
              <th className="text-left font-semibold px-4 py-3">Description</th>
              <th className="text-left font-semibold px-4 py-3">Category</th>
              <th className="text-right font-semibold px-4 py-3">Amount</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="px-4 py-3 whitespace-nowrap">{e.date}</td>
                <td className="px-4 py-3">{e.description}</td>
                <td className="px-4 py-3">{e.category}</td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(e.amount)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onDelete(e.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
