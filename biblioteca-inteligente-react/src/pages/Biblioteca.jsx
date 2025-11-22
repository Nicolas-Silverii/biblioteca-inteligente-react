import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ModalAjustes from "../components/ModalAjustes";
import Modal from "../components/Modal";
import Card from "../components/Card";
import "../styles/main.css";

function Biblioteca({ usuario, irA, cerrarSesion, tema, setTema, fuente, setFuente }) {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [libros, setLibros] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const [tipoModal, setTipoModal] = useState("info");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [accionesModal, setAccionesModal] = useState([]);
  const fetchLibrosImportados = async () => {
    
    try {
      const response = await fetch("http://localhost:3000/libros");
      if (!response.ok) throw new Error("Error al obtener libros");
      const data = await response.json();

      const favoritos = JSON.parse(localStorage.getItem("librosFavoritos")) || [];
      const idsFavoritos = favoritos.map((libro) => libro.id);
      const librosFiltrados = data.filter((libro) => !idsFavoritos.includes(libro.id));

      setLibros(librosFiltrados);
      setLibrosFiltrados(librosFiltrados);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLibrosImportados();
  }, []);

  const buscarEnOpenLibrary = async (titulo) => {
    try {
      const response = await fetch(
        `http://localhost:3000/libros/buscar?titulo=${encodeURIComponent(titulo)}`
      );
      if (!response.ok) throw new Error("Error al buscar en Open Library");
      const data = await response.json();
      setLibrosFiltrados(data);
    } catch (err) {
      console.error("❌ Error buscando en Open Library:", err.message);
    }
  };

  useEffect(() => {
    const resultadosLocales = libros.filter((libro) =>
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase())
    );

    setLibrosFiltrados(resultadosLocales);

    if (busqueda.trim() && resultadosLocales.length === 0) {
      buscarEnOpenLibrary(busqueda);
    }
  }, [busqueda, libros]);

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
      setAccionesModal([]);
      setMostrarModal(true);
      return;
    }

    const nuevoLibro = {
      ...libro,
      id: Date.now(),
      anio: libro.anio || new Date().getFullYear(),
      imagen_url: libro.imagen_url || "https://via.placeholder.com/120x180?text=Sin+portada",
    };

    const actualizados = [...favoritos, nuevoLibro];
    localStorage.setItem("librosFavoritos", JSON.stringify(actualizados));

    setMensajeModal("¡Libro agregado a favoritos!");
    setTipoModal("confirm");
    setAccionesModal([
      { texto: "Ver favoritos", onClick: () => irA("perfil") },
      { texto: "Seguir explorando", onClick: () => setMostrarModal(false) },
    ]);
    setMostrarModal(true);
  };

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
              librosFiltrados.map((libro, index) => (
                <Card
                  key={libro.id || index}
                  titulo={libro.titulo}
                  autor={libro.autor}
                  imagen={libro.imagen_url}
                  descripcion={`Publicado en ${libro.anio || "fecha desconocida"}`}
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

export default Biblioteca;
