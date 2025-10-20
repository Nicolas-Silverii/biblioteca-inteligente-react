import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ModalAjustes from "../components/ModalAjustes";
import Card from "../components/Card";
import librosData from "../data/libros.json"

function Biblioteca({ usuario, irA, cerrarSesion }) {
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [libros, setLibros] = useState([]);

useEffect(() => {
  const favoritos = JSON.parse(localStorage.getItem("librosFavoritos")) || [];

  const idsFavoritos = favoritos.map((libro) => libro.id);
  const librosFiltrados = librosData.filter((libro) => !idsFavoritos.includes(libro.id));

  setLibros([...librosFiltrados, ...favoritos]);
}, []);



  return (
    <>
      <Navbar
        vistaActual="biblioteca"
        irA={irA}
        cerrarSesion={cerrarSesion}
        mostrarBuscador={true}
        onAjustes={() => setMostrarAjustes(true)}
        usuario={usuario}
      />

      <main>
        <section id="mis-libros">
          <h2>BIBLIOTECA</h2>
          <div id="lista-libros" className="grid-libros">
            {libros.map((libro) => (
              <Card
                key={libro.id || libro.titulo}
                titulo={libro.titulo}
                autor={libro.autor}
                imagen={libro.imagen}
                descripcion={`Publicado en ${libro.año || "fecha desconocida"}`}
              />
            ))}
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

export default Biblioteca;
