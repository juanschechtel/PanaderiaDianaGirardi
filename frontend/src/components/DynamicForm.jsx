// components/DynamicForm.jsx
export default function DynamicForm({ config, onSubmit }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (id, value) => {
    setValues(prev => ({ ...prev, [id]: value }));
    setErrors(prev => { const e = { ...prev }; delete e[id]; return e; });
  };

  const handleSubmit = () => {
    const newErrors = {};
    config.sections.forEach(section =>
      section.fields.forEach(field => {
        if (field.required && !values[field.id]) {
          newErrors[field.id] = "Este campo es requerido";
        }
      })
    );
    if (Object.keys(newErrors).length) return setErrors(newErrors);
    onSubmit(values);
  };

  return (
    <div className="form-card">
      <h2>{config.title}</h2>
      {config.sections.map((section, i) => (
        <FormSection key={i} section={section} values={values} errors={errors} onChange={handleChange} />
      ))}
      <button onClick={handleSubmit}>{config.submitLabel}</button>
    </div>
  );
}