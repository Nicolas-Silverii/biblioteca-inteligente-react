function Input({ id, type, placeholder, value, onChange, required, label, error }) {
  return (
    <div className={`campo-wrapper ${error ? "error" : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="campo-texto"
        aria-label={label || placeholder}
      />
      {error && <span className="mensaje-error">{error}</span>}
    </div>
  );
}

export default Input;
