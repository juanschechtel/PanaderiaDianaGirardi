export default function FormField({ field, value, error, onChange }) {
  return (
    <div
      className="flex flex-col gap-1"
      style={{ gridColumn: field.span === 2 ? '1 / -1' : 'auto' }}
    >
      <label className="text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-400 ml-0.5">*</span>}
      </label>

      {field.type === 'select' && (
        <select
          value={value || ''}
          onChange={e => onChange(field.id, e.target.value)}
          className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors
            focus:border-amber-500 focus:ring-1 focus:ring-amber-500
            ${error ? 'border-red-400' : 'border-gray-300'}`}
        >
          <option value="">Seleccionar...</option>
          {field.options.map(o => <option key={o}>{o}</option>)}
        </select>
      )}

      {field.type === 'textarea' && (
        <textarea
          placeholder={field.placeholder}
          value={value || ''}
          onChange={e => onChange(field.id, e.target.value)}
          className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors resize-none h-24
            focus:border-amber-500 focus:ring-1 focus:ring-amber-500
            ${error ? 'border-red-400' : 'border-gray-300'}`}
        />
      )}

      {!['select', 'textarea'].includes(field.type) && (
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={e => onChange(field.id, e.target.value)}
          className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors
            focus:border-amber-500 focus:ring-1 focus:ring-amber-500
            ${error ? 'border-red-400' : 'border-gray-300'}`}
        />
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
