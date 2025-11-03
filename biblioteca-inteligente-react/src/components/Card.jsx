import Button from "./Button";

function Card({ titulo, autor, imagen, descripcion, onAgregar }) {
  return (
    <div className="book-card" role="article" aria-label={`Libro: ${titulo}`}>
      <img src={imagen} alt={`Portada de ${titulo}`} />
      <h3>{titulo}</h3>
      <p className="autor">{autor}</p>
      <p className="descripcion">{descripcion}</p>
      <Button text="Agregar a favoritos" onClick={onAgregar} variant="primario" />
    </div>
  );
}

export default Card;
