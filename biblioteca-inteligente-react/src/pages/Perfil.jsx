import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ModalAjustes from "../components/ModalAjustes";
import Modal from "../components/Modal";
import TarjetaLibro from "../components/TarjetaLibro";

function Perfil({ usuario, irA, cerrarSesion, tema, setTema, fuente, setFuente }) {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const [mensajeModal, setMensajeModal] = useState("");
  const [tipoModal, setTipoModal] = useState("info");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [accionesModal, setAccionesModal] = useState([]);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);

  useEffect(() => {
    try {
      const favoritosRaw = JSON.parse(localStorage.getItem("librosFavoritos")) || [];
      const favoritosNorm = favoritosRaw.map((lib) => ({
        id: lib.id ?? Date.now(),
        titulo: lib.titulo ?? "Sin título",
        autor: lib.autor ?? "Desconocido",
        anio: lib.anio ?? lib.año ?? new Date().getFullYear(),
        imagen_url:
          lib.imagen_url ??
          lib.imagen ??
          "https://via.placeholder.com/120x180?text=Sin+portada",
      }));
      setLibrosFavoritos(favoritosNorm);
    } catch (e) {
      console.error("Error al leer favoritos:", e);
      setLibrosFavoritos([]);
    }
  }, []);

  const agregarLibro = (e) => {
    e.preventDefault();
    const titulo = e.target.titulo?.value?.trim() || "";
    const autor = e.target.autor?.value?.trim() || "";
    const fileInput = e.target.imagen;
    const file = fileInput?.files?.[0] || null;

    if (!titulo || !autor) {
      setMensajeModal("Completá título y autor.");
      setTipoModal("error");
      setAccionesModal([]);
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
      setAccionesModal([]);
      setMostrarModal(true);
      return;
    }

    const nuevoLibro = {
      id: Date.now(),
      titulo,
      autor,
      anio: new Date().getFullYear(),
      imagen_url: file ? URL.createObjectURL(file) : "https://via.placeholder.com/120x180?text=Sin+portada",
    };

    const actualizados = [...librosFavoritos, nuevoLibro];
    localStorage.setItem("librosFavoritos", JSON.stringify(actualizados));
    setLibrosFavoritos(actualizados);

    e.target.reset();
    setMostrarAgregar(false);

    setMensajeModal("¡Libro agregado correctamente!");
    setTipoModal("confirm");
    setAccionesModal([
      { texto: "Ver todos", onClick: () => setMostrarModal(false) },
      { texto: "Volver a inicio", onClick: () => irA("biblioteca") },
    ]);
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
                  imagen={libro.imagen_url}
                  anio={libro.anio}
                  onEliminar={eliminarLibro}
                />
              ))
            ) : (
              <p>No tenés libros favoritos aún.</p>
            )}
          </div>
        </section>

        {/* Botón para abrir pop-up de agregar libro */}
        <section id="agregar-libro" style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            className="boton-primario"
            style={{
              padding: "12px 20px",
              fontSize: "1rem",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            onClick={() => setMostrarAgregar(true)}
          >
            📚 Agregar nuevo libro
          </button>
        </section>

        {/* Pop-up de agregar libro */}
        {mostrarAgregar && (
          <div className="popup-overlay">
            <div className="popup-contenido">
              <h3>Agregar nuevo libro</h3>
              <form id="form-nuevo-libro" onSubmit={agregarLibro}>
                <input type="text" name="titulo" placeholder="Título" required />
                <input type="text" name="autor" placeholder="Autor" required />
                <input type="file" name="imagen" accept="image/*" />
                <div className="modal-acciones">
                  <button type="submit" className="boton-primario">Agregar</button>
                  <button
                    type="button"
                    className="boton-secundario"
                    onClick={() => setMostrarAgregar(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ModalAjustes
          visible={mostrarAjustes}
          onClose={() => setMostrarAjustes(false)}
          tema={tema}
          setTema={setTema}
          fuente={fuente}
          setFuente={setFuente}
        />

        {mostrarModal && (
          <Modal
            mensaje={mensajeModal}
            tipo={tipoModal}
            onClose={() => setMostrarModal(false)}
            acciones={accionesModal}
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
