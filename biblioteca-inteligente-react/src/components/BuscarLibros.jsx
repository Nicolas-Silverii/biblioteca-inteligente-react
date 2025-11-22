import React, { useState } from "react";
import Card from "./Card";

// Buscar e importar libros desde el backend
function BuscarLibros({ onImportarExitoso }) {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Buscar libros en Open Library
  const buscarLibros = async () => {
    if (!query.trim()) return;

    setCargando(true);
    setError(null);
    setResultados([]);

    try {
      const response = await fetch(
        `http://localhost:3000/libros/buscar?titulo=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("No se pudo obtener resultados");
      }
      const data = await response.json();
      setResultados(data); // guarda resultados en estado
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Importar un libro y persistirlo en la base
  const importarLibro = async (titulo) => {
    try {
      const response = await fetch(
        `http://localhost:3000/libros/importar?titulo=${encodeURIComponent(titulo)}`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Error al importar libro");

      const data = await response.json();
      alert(`✅ Libro importado: ${data[0].titulo}`);

      // refrescar lista en Biblioteca
      if (onImportarExitoso) onImportarExitoso();
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div className="buscar-libros">
      <h3>Buscar libros en Open Library</h3>

      {/* Input controlado + botón de búsqueda */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Título del libro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={buscarLibros}>Buscar</button>
      </div>

      {/* Mensajes de carga o error */}
      {cargando && <p>Cargando resultados...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Renderizado de resultados como tarjetas */}
      <div className="grid-libros">
        {resultados.map((libro, index) => (
          <Card
            key={index}
            titulo={libro.titulo}
            autor={libro.autor}
            imagen={libro.imagen_url}
            descripcion={`Publicado en ${libro.anio || "fecha desconocida"} - ${libro.descripcion}`}
            onAgregar={() => importarLibro(libro.titulo)}
          />
        ))}
      </div>
    </div>
  );
}

export default BuscarLibros;
