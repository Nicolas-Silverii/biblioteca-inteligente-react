import Button from "./Button";         
import "../styles/modal.css";         

// m uestra un mensaje emergente con ícono y botón para cerrar
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
    // Fondo oscuro que cubre toda la pantalla
    <div className="popup-overlay" role="alertdialog" aria-labelledby="modal-mensaje">
      {/* Contenedor del contenido del modal */}
      <div className={`popup-contenido modal-${tipo}`}>
        {/* Mensaje con ícono */}
        <p id="modal-mensaje" className="modal-mensaje">
          <span className="modal-icono">{iconos[tipo]}</span> {mensaje}
        </p>
        {/* Botón para cerrar el modal */}
        <Button text="Cerrar" onClick={onClose} variant="primario" />
      </div>
    </div>
  );
};

export default Modal;
