function Button({ text, onClick, type = "button", variant = "primario", icon = null, ariaLabel }) {
  return (
    <button
      className={`boton boton-${variant}`}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel || text}
    >
      {icon && <span className="boton-icono">{icon}</span>}
      {text}
    </button>
  );
}

export default Button;
