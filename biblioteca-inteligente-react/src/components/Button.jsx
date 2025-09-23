function Button({ text, onClick, type = "button" }) {
  return (
    <button
      className="boton-principal"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
