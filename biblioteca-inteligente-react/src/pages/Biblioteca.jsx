import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ModalAjustes from "../components/ModalAjustes";
import Card from "../components/Card";
import librosData from "../data/libros.json";
import "../styles/main.css";

function Biblioteca({ usuario, irA, cerrarSesion, tema, setTema, fuente, setFuente }) {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [libros, setLibros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const [tipoModal, setTipoModal] = useState("info");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("librosFavoritos")) || [];
    const idsFavoritos = favoritos.map((libro) => libro.id);
    const librosFiltrados = librosData.filter((libro) => !idsFavoritos.includes(libro.id));
    setLibros(librosFiltrados);
  }, []);

  const agregarAFavoritos = (libro) => {
    const favoritos = JSON.parse(localStorage.getItem("librosFavoritos")) || [];

    const existe = favoritos.some(
      (fav) =>
        fav.titulo.toLowerCase() === libro.titulo.toLowerCase() &&
        fav.autor.toLowerCase() === libro.autor.toLowerCase()
    );

    if (existe) {
      setMensajeModal("Ese libro ya está en tus favoritos.");
      setTipoModal("error");
      setMostrarModal(true);
      return;
    }

    const nuevoLibro = {
      ...libro,
      id: Date.now(),
      año: libro.año || new Date().getFullYear(),
    };

    const actualizados = [...favoritos, nuevoLibro];
    localStorage.setItem("librosFavoritos", JSON.stringify(actualizados));

    setMensajeModal("¡Libro agregado a favoritos!");
    setTipoModal("confirm");
    setMostrarModal(true);
  };

  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    libro.autor.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Navbar
        vistaActual="biblioteca"
        irA={irA}
        cerrarSesion={cerrarSesion}
        mostrarBuscador={true}
        onAjustes={() => setMostrarAjustes(true)}
        usuario={usuario}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <main>
        <section id="mis-libros">
          <h2>BIBLIOTECA</h2>
          <div id="lista-libros" className="grid-libros">
            {librosFiltrados.length > 0 ? (
              librosFiltrados.map((libro) => (
                <Card
                  key={libro.titulo + libro.autor}
                  titulo={libro.titulo}
                  autor={libro.autor}
                  imagen={libro.imagen}
                  descripcion={`Publicado en ${libro.año || "fecha desconocida"}`}
                  onAgregar={() => agregarAFavoritos(libro)}
                />
              ))
            ) : (
              <p>No se encontraron libros con ese criterio.</p>
            )}
          </div>
        </section>

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

export default Biblioteca;
