function formatCurrency(value) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value ?? 0);
  } catch {
    return `$${Number(value ?? 0).toFixed(2)}`;
  }
}

export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + (Number(e.amount) || 0);
    return acc;
  }, {});

  const entries = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h2 className="text-lg font-semibold">Summary</h2>
        <div className="text-right">
          <div className="text-sm text-slate-600">Total</div>
          <div className="text-2xl font-bold">{formatCurrency(total)}</div>
        </div>
      </div>

      {entries.length > 0 ? (
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {entries.map(([cat, amt]) => (
            <div key={cat} className="rounded-lg border border-slate-200 px-3 py-2 flex items-center justify-between">
              <span className="font-medium">{cat}</span>
              <span className="text-slate-700">{formatCurrency(amt)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600 mt-3">No expenses yet. Add an expense to see your summary.</p>
      )}
    </div>
  );
}
