import { Filter, Search } from 'lucide-react';

export default function FiltersBar({ categories, value, onChange }) {
  const setField = (field, val) => onChange({ ...value, [field]: val });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3 mb-3">
        <Filter className="w-4 h-4 text-slate-500" />
        <h3 className="text-sm font-semibold tracking-tight">Filters</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="col-span-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={value.q}
              onChange={(e) => setField('q', e.target.value)}
              placeholder="Search description or category"
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
        </div>
        <select
          value={value.category}
          onChange={(e) => setField('category', e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={value.startDate}
            onChange={(e) => setField('startDate', e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
          <input
            type="date"
            value={value.endDate}
            onChange={(e) => setField('endDate', e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>
    </div>
  );
}
