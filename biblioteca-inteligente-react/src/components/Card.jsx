function Card({ titulo, autor, imagen, descripcion }) {
  return (
    <div className="card">
      <img src={imagen} alt={titulo} className="card-img" />
      <h3>{titulo}</h3>
      <p><strong>Autor:</strong> {autor}</p>
      <p>{descripcion}</p>
    </div>
  );
}

export default Card;
