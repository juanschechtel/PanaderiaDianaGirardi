// components/FormField.jsx
export default function FormField({ field, value, error, onChange }) {
  const style = { gridColumn: field.span === 2 ? "1 / -1" : "auto" };

  return (
    <div className="field" style={style}>
      <label>{field.label}{field.required && " *"}</label>

      {field.type === "select" && (
        <select value={value || ""} onChange={e => onChange(field.id, e.target.value)}>
          <option value="">Seleccionar...</option>
          {field.options.map(o => <option key={o}>{o}</option>)}
        </select>
      )}

      {field.type === "textarea" && (
        <textarea
          placeholder={field.placeholder}
          value={value || ""}
          onChange={e => onChange(field.id, e.target.value)}
        />
      )}

      {!["select", "textarea"].includes(field.type) && (
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={value || ""}
          onChange={e => onChange(field.id, e.target.value)}
        />
      )}

      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}