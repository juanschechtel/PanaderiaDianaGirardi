import { useState } from 'react'
import FormField from './FormField'

// DynamicForm: arma el form a partir de una config.
// Ya no usa FormSection como archivo aparte — las secciones
// se recorren directo acá adentro, así todo el flujo
// (estado → validación → render) se lee en un solo lugar.

export default function DynamicForm({ config, onSubmit }) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (id, value) => {
    setValues(prev => ({ ...prev, [id]: value }))
    setErrors(prev => { const e = { ...prev }; delete e[id]; return e })
  }

  const handleSubmit = () => {
    const result = config.schema.safeParse(values)
    if (!result.success) {
      const newErrors = {}
      result.error.errors.forEach(err => {
        if (!newErrors[err.path[0]]) newErrors[err.path[0]] = err.message
      })
      return setErrors(newErrors)
    }
    onSubmit(result.data)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>

      {/* Antes: <FormSection> por cada sección.
          Ahora: el mismo recorrido, sin archivo aparte. */}
      {config.sections.map((section, i) => (
        <div key={i} className="flex flex-col gap-3">
          {section.label && (
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {section.label}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {section.fields.map(field => (
              <FormField
                key={field.id}
                field={field}
                value={values[field.id]}
                error={errors[field.id]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-2.5 rounded-lg transition-colors text-sm mt-2"
      >
        {config.submitLabel}
      </button>
    </div>
  )
}
