export default function Filters({ categories, value, onChange }) {
  const handle = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={value.category}
            onChange={(e) => handle({ category: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search description or amount"
            value={value.query}
            onChange={(e) => handle({ query: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="date"
            value={value.from}
            onChange={(e) => handle({ from: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="date"
            value={value.to}
            onChange={(e) => handle({ to: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sort</label>
        <select
          value={value.sort}
          onChange={(e) => handle({ sort: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="amountDesc">Amount: High to Low</option>
          <option value="amountAsc">Amount: Low to High</option>
        </select>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          className="text-sm text-slate-600 hover:text-slate-900"
          onClick={() => onChange({ category: "All", query: "", from: "", to: "", sort: "newest" })}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
