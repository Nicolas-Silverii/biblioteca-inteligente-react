import { useState } from "react";
import Button from "./Button";

function TarjetaLibro({ titulo, autor, imagen, anio, id, onEliminar }) {
  const [visible, setVisible] = useState(true);

  const eliminarLibro = () => {
    if (onEliminar) onEliminar(id);
    setVisible(false);
  };

  if (!visible) return null;

  const imagenFinal = imagen || "https://via.placeholder.com/120x180?text=Sin+portada";

  return (
    <div className="libro-favorito tarjeta-libro" role="article" aria-label={`Libro: ${titulo}`}>
      <img
        src={imagenFinal}
        alt={`Portada de ${titulo}`}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/120x180?text=Sin+portada";
        }}
      />
      <h3>{titulo}</h3>
      <p className="autor">{autor}</p>
      <p className="descripcion">Publicado en {anio}</p>
      <Button
        text="🗑 Eliminar"
        onClick={eliminarLibro}
        variant="primario"
        ariaLabel={`Eliminar ${titulo}`}
      />
    </div>
  );
}

export default TarjetaLibro;
