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
      <div id="logo-container">
        {/* Logo principal de la app */}
        <img src="/img/logo2.png" alt="Logo Libropolis" id="logo" />
      </div>

      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            {/* Botón para ir a la Biblioteca. Se desactiva al estár ahí */}
            <button className="nav-btn" onClick={() => irA("biblioteca")} disabled={vistaActual === "biblioteca"}>
              📚 Inicio
            </button>
          </li>
          <li>
            {/* Botón para ir al Perfil. Se desactiva si ya estamos ahí */}
            <button className="nav-btn" onClick={() => irA("perfil")} disabled={vistaActual === "perfil"}>
              👤 Mis libros
            </button>
          </li>
          <li className="empujar-derecha">
            {/* Saludo personalizado si hay usuario */}
            {usuario && <span className="saludo-usuario">👋 Hola, {usuario.nombre}</span>}
            {/* Botón para cerrar sesión */}
            <button className="nav-btn" onClick={cerrarSesion}>🚪 Cerrar sesión</button>
            {/* Botón para abrir ajustes */}
            <button className="nav-btn" onClick={onAjustes}>⚙ Ajustes</button>
          </li>
        </ul>
      </nav>

      {/* Input de búsqueda, solo si mostrarBuscador está en true */}
      {mostrarBuscador && (
        <div className="buscador-wrapper">
          <input
            type="text"
            className="buscador-input"
            placeholder="🔍 Buscar libros por título o autor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} // Actualiza el estado de búsqueda en tiempo real
          />
        </div>
      )}
    </header>
  );
}

export default Navbar;
