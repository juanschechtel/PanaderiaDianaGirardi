// components/FormSection.jsx
import FormField from "./FormField";

export default function FormSection({ section, values, errors, onChange }) {
  return (
    <div className="form-section">
      {section.label && <p className="section-label">{section.label}</p>}
      
      <div className="form-grid">
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
  );
}