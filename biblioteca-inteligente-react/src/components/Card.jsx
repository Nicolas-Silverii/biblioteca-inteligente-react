function Card({ titulo, autor, imagen, descripcion }) {
  return (
    <div className="book-card">
      <img src={imagen} alt={`Portada de ${titulo}`} />
      <h3>{titulo}</h3>
      <p className="autor">{autor}</p>
      <p className="descripcion">{descripcion}</p>
      <button className="boton-primario">Agregar a favoritos</button>
    </div>
  );
}

export default Card;
