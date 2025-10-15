import { useEffect } from "react";

function ModalAjustes({ visible, onClose }) {
  useEffect(() => {
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-contenido" onClick={(e) => e.stopPropagation()}>
        <h2>Ajustes</h2>

        <label htmlFor="tema-select">Tema:</label>
        <select id="tema-select">
          <option value="claro">Claro</option>
          <option value="oscuro">Oscuro</option>
        </select>   

        <label htmlFor="fuente-select">Tamaño de fuente:</label>
        <select id="fuente-select">
          <option value="chica">Chica</option>
          <option value="mediana">Mediana</option>
          <option value="grande">Grande</option>
        </select>

        <div className="popup-botones">
          <button className="boton-primario" onClick={onClose}>
            Guardar
          </button>
          <button className="boton-peligro" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAjustes;
