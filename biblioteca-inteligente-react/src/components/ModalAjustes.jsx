import Button from "./Button"; 

// permite cambiar el tema y el tamaño de fuente
function ModalAjustes({ visible, onClose, tema, setTema, fuente, setFuente }) {
  // Si el modal no está visible, no se renderiza nada
  if (!visible) return null;

  return (
    // Fondo oscuro que cubre toda la pantalla
    <div className="popup-overlay" onClick={onClose}>
      {/* Contenedor del contenido del modal. */}
      <div className="popup-contenido" onClick={(e) => e.stopPropagation()}>
        <h2>Ajustes</h2>

        {/* Selector de tema */}
        <label htmlFor="tema-select">Tema:</label>
        <select
          id="tema-select"
          value={tema}
          onChange={(e) => setTema(e.target.value)} // Actualiza el estado global del tema
        >
          <option value="claro">Claro</option>
          <option value="oscuro">Oscuro</option>
        </select>

        {/* Selector de tamaño de fuente */}
        <label htmlFor="fuente-select">Tamaño de fuente:</label>
        <select
          id="fuente-select"
          value={fuente}
          onChange={(e) => setFuente(e.target.value)} // Actualiza el estado global de fuente
        >
          <option value="chica">Chica</option>
          <option value="mediana">Mediana</option>
          <option value="grande">Grande</option>
        </select>

        {/* Botones para cerrar el modal */}
        <div className="popup-botones">
          <Button text="Guardar" onClick={onClose} variant="primario" />
          <Button text="Cancelar" onClick={onClose} variant="peligro" />
        </div>
      </div>
    </div>
  );
}

export default ModalAjustes;
