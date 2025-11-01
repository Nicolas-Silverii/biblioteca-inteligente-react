import { useState } from "react";
import Button from "./Button";

// Representa una tarjeta de libro
function TarjetaLibro({ titulo, autor, imagen, año, id, onEliminar }) {
  // Estado local para saber si la tarjeta está visible o no
  const [visible, setVisible] = useState(true);

  // Se ejecuta al apretar el botón de eliminar
  const eliminarLibro = () => {
    // Si se pasa una función para eliminar desde el padre, la llamamos con el id del libro
    if (onEliminar) onEliminar(id);
    // Ocultar tarjeta (no la borramos del DOM, solo la dejamos de mostrar)
    setVisible(false);
  };

  // Si la tarjeta no está visible, no renderizamos nada
  if (!visible) return null;

  // Tarjeta con toda la info del libro
  return (
    <div className="libro-favorito tarjeta-libro" role="article" aria-label={`Libro: ${titulo}`}>
      {/* Imagen */}
      <img src={imagen} alt={`Portada de ${titulo}`} />
      {/* Título del libro */}
      <h3>{titulo}</h3>
      {/* Autor */}
      <p className="autor">{autor}</p>
      {/* Año de publicación */}
      <p className="descripcion">Publicado en {año}</p>
      {/* Botón para eliminar el libro */}
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
