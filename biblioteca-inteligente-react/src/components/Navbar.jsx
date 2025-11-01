function Navbar({
  vistaActual,       
  irA,               
  cerrarSesion,      
  mostrarBuscador = false, 
  onAjustes,         
  usuario,           
  busqueda,           
  setBusqueda        
}) {
  return (
    <header className="navbar-header">
      {/* Logo principal de la app */}
      <div id="logo-container">
        <img id="logo-navbar" src="/img/logo1.png" alt="Logo de navegación" />
      </div>

      {/* Menú de navegación */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            {/* Botón para ir a la Biblioteca. Se desactiva si ya estamos ahí */}
            <button
              className="nav-btn"
              onClick={() => irA("biblioteca")}
              disabled={vistaActual === "biblioteca"}
              aria-label="Ir a Biblioteca"
            >
              📚 Inicio
            </button>
          </li>
          <li>
            {/* Botón para ir al Perfil. Se desactiva si ya estamos ahí */}
            <button
              className="nav-btn"
              onClick={() => irA("perfil")}
              disabled={vistaActual === "perfil"}
              aria-label="Ir a Perfil"
            >
              👤 Mis libros
            </button>
          </li>
          <li className="empujar-derecha">
            {/* Saludo personalizado si hay usuario */}
            {usuario && (
              <span className="saludo-usuario">👋 Hola, {usuario.nombre}</span>
            )}
            {/* Botón para cerrar sesión */}
            <button
              className="nav-btn"
              onClick={cerrarSesion}
              aria-label="Cerrar sesión"
            >
              🚪 Cerrar sesión
            </button>
            {/* Botón para abrir ajustes */}
            <button
              className="nav-btn"
              onClick={onAjustes}
              aria-label="Abrir ajustes"
            >
              ⚙ Ajustes
            </button>
          </li>
        </ul>
      </nav>

      {/* Input de búsqueda */}
      {mostrarBuscador && (
        <div className="buscador-wrapper">
          <input
            type="text"
            className="buscador-input"
            placeholder="🔍 Buscar libros por título o autor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} 
            aria-label="Buscar libros"
          />
        </div>
      )}
    </header>
  );
}

export default Navbar;
