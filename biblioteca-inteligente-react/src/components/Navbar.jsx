function Navbar({ vistaActual, irA, cerrarSesion, mostrarBuscador = false, onAjustes, usuario }) {
  return (
    <header>
      <div id="logo-container">
        <img src="/img/logo.png" alt="Logo Biblioteca" id="logo" />
      </div>

      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <button
              className="nav-btn"
              onClick={() => irA("biblioteca")}
              disabled={vistaActual === "biblioteca"}
            >
              📚 Inicio
            </button>
          </li>
          <li>
            <button
              className="nav-btn"
              onClick={() => irA("perfil")}
              disabled={vistaActual === "perfil"}
            >
              👤 Mis libros
            </button>
          </li>
          <li className="empujar-derecha">
            {usuario && <span className="saludo-usuario">👋 Hola, {usuario.nombre}</span>}
            <button className="nav-btn" onClick={cerrarSesion}>
              🚪 Cerrar sesión
            </button>
            <button className="nav-btn" onClick={onAjustes}>
              ⚙ Ajustes
            </button>
          </li>
        </ul>
      </nav>

      {mostrarBuscador && (
        <div className="buscador-wrapper">
  
          <input
            type="text"
            className="buscador-input"
            placeholder="🔍 Buscar libros por título o autor..."
          />
        </div>
      )}
    </header>
  );
}

export default Navbar;
