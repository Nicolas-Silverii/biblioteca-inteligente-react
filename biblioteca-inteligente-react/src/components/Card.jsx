import { useState, useEffect } from "react";
import Button from "./Button";

function Card({ titulo, autor, imagen, descripcion, onAgregar }) {
  const [mensajeInline, setMensajeInline] = useState("");

  useEffect(() => {
    if (mensajeInline) {
      const timer = setTimeout(() => setMensajeInline(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [mensajeInline]);

  const manejarAgregar = () => {
    const resultado = onAgregar?.();
    if (resultado === "existe") {
      setMensajeInline("⚠️ Ya está en favoritos");
    } else if (resultado === "agregado") {
      setMensajeInline("✅ Agregado a favoritos");
    }
  };

  return (
    <div className="card-libro">
      <img
        src={imagen || "https://via.placeholder.com/120x180?text=Sin+portada"}
        alt={`Portada de ${titulo}`}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/120x180?text=Sin+portada";
        }}
      />
      <h3>{titulo}</h3>
      <p>{autor}</p>
      <p>{descripcion}</p>

      <Button
        text="⭐ Agregar a favoritos"
        onClick={manejarAgregar}
        variant="primario"
      />

      {mensajeInline && (
        <div className="mensaje-inline">
          {mensajeInline}
        </div>
      )}
    </div>
  );
}

export default Card;
