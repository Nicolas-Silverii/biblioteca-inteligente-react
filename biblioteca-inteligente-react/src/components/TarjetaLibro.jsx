import { useState } from "react";

// Representa una tarjeta de libro, con su info y un botón para eliminarlo
function TarjetaLibro({ titulo, autor, imagen, año, id, onEliminar }) {
  // Estado local para saber si la tarjeta está visible o no
  const [visible, setVisible] = useState(true);

  // Se ejecuta al apretar el botón de eliminar
  const eliminarLibro = () => {
    // Si se pasa una función para eliminar desde el padre, la llamamos con el id del libro
    if (onEliminar) {
      onEliminar(id); 
    }
    // Ocultar tarjeta (no la borramos del DOM, solo la dejamos de mostrar)
    setVisible(false);
  };

  // Si la tarjeta no está visible, no renderizamos nada
  if (!visible) return null;

  // Tarjeta con toda la info del libro
  return (
    <div className="libro-favorito tarjeta-libro">
      {/* Imagen */}
      <img src={imagen} alt={`Portada de ${titulo}`} />
      {/* Título del libro*/}
      <h3>{titulo}</h3>
      {/* Autor */}
      <p className="autor">{autor}</p>
      {/* Año de publicación */}
      <p className="descripcion">Publicado en {año}</p>
      {/* Botón para eliminar el libro */}
      <button className="boton-primario" onClick={eliminarLibro}>
        🗑 Eliminar
      </button>
    </div>
  );
}
export default TarjetaLibro;
