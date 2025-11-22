import Button from "./Button";
import "../styles/modal.css";

// mensaje emergente con íconos y botones
const Modal = ({ mensaje, tipo = "info", onClose, acciones = [] }) => {
  if (!mensaje) return null;

  const iconos = {
    info: "ℹ️",
    error: "❌",
    confirm: "✅",
  };

  return (
    <div className="popup-overlay" role="alertdialog" aria-labelledby="modal-mensaje">
      <div className={`popup-contenido modal-${tipo}`}>
        <p id="modal-mensaje" className="modal-mensaje">
          <span className="modal-icono">{iconos[tipo]}</span> {mensaje}
        </p>

        <div className="modal-acciones">
          {/* Botones personalizados */}
          {acciones.map((accion, index) => (
            <Button
              key={index}
              text={accion.texto}
              onClick={accion.onClick}
              variant="secundario"
              ariaLabel={accion.texto}
            />
          ))}

          {/* Solo mostrar botón "Cerrar" si es error */}
          {tipo === "error" && (
            <Button text="Cerrar" onClick={onClose} variant="primario" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
