import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormField from './FormField'

export default function DynamicForm({ config, onSubmit }) {
  const defaultValues = useMemo(() => {
    return config.sections
      .flatMap(section => section.fields)
      .reduce((values, field) => ({ ...values, [field.id]: '' }), {})
  }, [config])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(config.schema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>

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
                register={register}
                error={errors[field.id]?.message}
              />
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors text-sm mt-2"
      >
        {config.submitLabel}
      </button>
    </form>
  )
}
