import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ModalAjustes from "../components/ModalAjustes";
import Modal from "../components/Modal";
import TarjetaLibro from "../components/TarjetaLibro";

function Perfil({ usuario, irA, cerrarSesion }) {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const [mensajeModal, setMensajeModal] = useState("");
  const [tipoModal, setTipoModal] = useState("info");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("librosFavoritos")) || [];
    setLibrosFavoritos(favoritos);
  }, []);

  const agregarLibro = (e) => {
    e.preventDefault();
    const titulo = e.target.titulo.value.trim();
    const autor = e.target.autor.value.trim();
    const imagen = e.target.imagen.files[0];

    if (!titulo || !autor || !imagen) {
      setMensajeModal("Completá todos los campos.");
      setTipoModal("error");
      setMostrarModal(true);
      return;
    }

    const existe = librosFavoritos.some(
      (libro) =>
        libro.titulo.toLowerCase() === titulo.toLowerCase() &&
        libro.autor.toLowerCase() === autor.toLowerCase()
    );

    if (existe) {
      setMensajeModal("Ese libro ya está en tus favoritos.");
      setTipoModal("error");
      setMostrarModal(true);
      return;
    }

    const nuevoLibro = {
      id: Date.now(),
      titulo,
      autor,
      imagen: URL.createObjectURL(imagen),
      año: new Date().getFullYear(),
    };

    const actualizados = [...librosFavoritos, nuevoLibro];
    localStorage.setItem("librosFavoritos", JSON.stringify(actualizados));
    setLibrosFavoritos(actualizados);
    e.target.reset();

    setMensajeModal("¡Libro agregado correctamente!");
    setTipoModal("confirm");
    setMostrarModal(true);
  };

  const eliminarLibro = (id) => {
    const actualizados = librosFavoritos.filter((libro) => libro.id !== id);
    localStorage.setItem("librosFavoritos", JSON.stringify(actualizados));
    setLibrosFavoritos(actualizados);
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
            {librosFavoritos.length > 0 ? (
              librosFavoritos.map((libro) => (
                <TarjetaLibro
                  key={libro.id}
                  id={libro.id}
                  titulo={libro.titulo}
                  autor={libro.autor}
                  imagen={libro.imagen}
                  año={libro.año}
                  onEliminar={eliminarLibro}
                />
              ))
            ) : (
              <p>No tenés libros favoritos aún.</p>
            )}
          </div>
        </section>

        <section id="agregar-libro" className="grid-libros">
          <div className="libro-favorito">
            <h3>Agregar nuevo libro</h3>
            <form id="form-nuevo-libro" onSubmit={agregarLibro}>
              <input type="text" name="titulo" placeholder="Título" required />
              <input type="text" name="autor" placeholder="Autor" required />
              <input type="file" name="imagen" accept="image/*" required />
              <button type="submit" className="boton-primario">Agregar</button>
            </form>
          </div>
        </section>

        <ModalAjustes visible={mostrarAjustes} onClose={() => setMostrarAjustes(false)} />
        {mostrarModal && (
          <Modal
            mensaje={mensajeModal}
            tipo={tipoModal}
            onClose={() => setMostrarModal(false)}
          />
        )}
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
