import { useState } from "react";
import Navbar from "../components/Navbar";
import ModalAjustes from "../components/ModalAjustes";

function Perfil({ usuario, irA, cerrarSesion }) {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);

  const agregarLibro = (e) => {
    e.preventDefault();
    const nuevoLibro = {
      id: Date.now(),
      titulo: e.target.titulo.value,
      autor: e.target.autor.value,
      imagen: URL.createObjectURL(e.target.imagen.files[0]),
      año: new Date().getFullYear(),
    };

    const librosGuardados = JSON.parse(localStorage.getItem("librosFavoritos")) || [];
    localStorage.setItem("librosFavoritos", JSON.stringify([...librosGuardados, nuevoLibro]));

    console.log("Libro agregado:", nuevoLibro);
    e.target.reset();
  };

  return (
    <>
      <Navbar
        vistaActual="perfil"
        irA={irA}
        cerrarSesion={cerrarSesion}
        onAjustes={() => setMostrarAjustes(true)}
        usuario={usuario}
      />

      <main>
        <section id="mis-libros">
          <h2>MIS LIBROS</h2>
          <div id="favoritos-container" className="grid-libros">
            {/* Libros */}
          </div>
        </section>

        <section id="agregar-libro" className="grid-libros">
          <div className="libro-favorito">
            <h3>Agregar nuevo libro</h3>
            <form id="form-nuevo-libro" onSubmit={agregarLibro}>
              <input type="text" name="titulo" placeholder="Título" required />
              <input type="text" name="autor" placeholder="Autor" required />
              <input type="file" name="imagen" accept="image/*" required />
              <button type="submit">Agregar</button>
            </form>
          </div>
        </section>

        <ModalAjustes visible={mostrarAjustes} onClose={() => setMostrarAjustes(false)} />

      </main>

      <footer>
        <p>© 2025 Biblioteca Interactiva – Todos los derechos reservados</p>
        <p>
          <a href="#">Términos y condiciones</a> | <a href="#">Política de privacidad</a>
        </p>
      </footer>
    </>
  );
}

export default Perfil;
