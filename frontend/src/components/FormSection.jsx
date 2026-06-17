import FormField from './FormField'

export default function FormSection({ section, values, errors, onChange }) {
  return (
    <div className="flex flex-col gap-3">
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
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}
