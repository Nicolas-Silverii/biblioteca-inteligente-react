import { useEffect, useState } from "react";

function ModalAjustes({ visible, onClose }) {
  // Estado local para el tema visual (claro u oscuro)
  const [tema, setTema] = useState("claro");

  // Estado local para el tamaño de fuente
  const [fuente, setFuente] = useState("mediana");

  // Cada vez que cambia el tema o la fuente, se actualizan las clases del body
  // Afectando el estilo global de la página (modo claro/oscuro y tamaño de texto)
  useEffect(() => {
    document.body.className = `login-page ${tema} fuente-${fuente}`;
  }, [tema, fuente]);

  // Si el modal no está visible, no renderizamos nada
  if (!visible) return null;

  return (
    // Fondo oscuro que cierra el modal al hacer clic fuera del contenido
    <div className="popup-overlay" onClick={onClose}>
      {/* Evita que el clic dentro del modal active el cierre del overlay exterior */}
      <div className="popup-contenido" onClick={(e) => e.stopPropagation()}>
        <h2>Ajustes</h2>

        {/* Selector de tema visual */}
        <label htmlFor="tema-select">Tema:</label>
        <select id="tema-select" value={tema} onChange={(e) => setTema(e.target.value)}>
          <option value="claro">Claro</option>
          <option value="oscuro">Oscuro</option>
        </select>

        {/* Selector de tamaño de fuente */}
        <label htmlFor="fuente-select">Tamaño de fuente:</label>
        <select id="fuente-select" value={fuente} onChange={(e) => setFuente(e.target.value)}>
          <option value="chica">Chica</option>
          <option value="mediana">Mediana</option>
          <option value="grande">Grande</option>
        </select>

        {/* Botones para cerrar el modal. Ambos llaman onClose, pero podrían tener lógica distinta si se desea */}
        <div className="popup-botones">
          <button className="boton-primario" onClick={onClose}>Guardar</button>
          <button className="boton-peligro" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalAjustes;
