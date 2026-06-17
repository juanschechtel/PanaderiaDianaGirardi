import { useState } from 'react'
import FormSection from './FormSection'

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
      {config.sections.map((section, i) => (
        <FormSection
          key={i}
          section={section}
          values={values}
          errors={errors}
          onChange={handleChange}
        />
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
