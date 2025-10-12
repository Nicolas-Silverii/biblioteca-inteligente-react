import React from 'react';
import './Modal.css'; // si querés estilos separados

const Modal = ({ mensaje, tipo, onClose }) => {
  if (!mensaje) return null;

  const estilos = {
    info: { backgroundColor: '#e0f7fa', color: '#00796b' },
    error: { backgroundColor: '#ffebee', color: '#c62828' },
    confirm: { backgroundColor: '#fff3e0', color: '#ef6c00' },
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido" style={estilos[tipo] || estilos.info}>
        <p>{mensaje}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
