import React from "react";
import "../styles/modal.css"; 

// Muestra un mensaje emergente con un ícono y un botón para cerrar
const Modal = ({ mensaje, tipo = "info", onClose }) => {
  // Si no hay mensaje, no se muestra nada
  if (!mensaje) return null;

  // Íconos según el tipo de mensaje
  const iconos = {
    info: "ℹ️",     // Informativo
    error: "❌",    // Error
    confirm: "✅",  // Confirmación 
  };

  return (
    <div className="popup-overlay">
      <div className={`popup-contenido modal-${tipo}`}>
        <p className="modal-mensaje">
          {/* Se muestra el ícono correspondiente y el mensaje */}
          <span className="modal-icono">{iconos[tipo]}</span> {mensaje}
        </p>
        {/* botón cerrar modal */}
        <button className="boton boton-primario" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
