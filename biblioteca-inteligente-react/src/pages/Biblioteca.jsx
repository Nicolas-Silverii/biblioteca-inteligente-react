function Libros() {
  return (
    <>
      <header>
        <div id="logo-container">
          <img src="/img/logo.png" alt="Logo Biblioteca" id="logo" />
        </div>

        <nav className="navbar">
          <ul className="navbar-list">
            <li><a href="/libros">📚 Biblioteca</a></li>
            <li><a href="/perfil">👤 Mis libros</a></li>
            <li className="empujar-derecha">
              <div className="search-container">
                <input type="text" id="buscar-libros" placeholder="Buscar libros..." />
              </div>
              <a href="#">🚪 Cerrar sesión</a>
              <button id="btn-ajustes">⚙</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="mis-libros">
          <h2>BIBLIOTECA</h2>
          <div id="lista-libros" className="grid-libros"></div>
        </section>
      </main>

      <div id="modal-ajustes" className="modal oculto">
        <div className="modal-contenido">
          <h2 id="modal-title">Ajustes</h2>

          <label htmlFor="tema-select">Tema:</label>
          <select id="tema-select">
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>

          <label htmlFor="fuente-select">Tamaño de Fuente:</label>
          <select id="fuente-select">
            <option value="chica">Chica</option>
            <option value="mediana">Mediana</option>
            <option value="grande">Grande</option>
          </select>

          <div className="modal-botones">
            <button id="guardar-ajustes">Guardar</button>
            <button id="cerrar-ajustes">Cerrar</button>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2025 Biblioteca Interactiva – Todos los derechos reservados</p>
        <p>
          <a href="#">Términos y condiciones</a> | <a href="#">Política de privacidad</a>
        </p>
      </footer>
    </>
  );
}

export default Libros;
