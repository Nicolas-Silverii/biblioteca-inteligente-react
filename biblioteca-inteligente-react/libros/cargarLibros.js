import mysql from "mysql2/promise";

// conexión a MySQL
const conexion = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "libropolis"
});

// obtener libros desde open library
async function obtenerLibros() {
  const respuesta = await fetch("https://openlibrary.org/search.json?q=historia");
  const data = await respuesta.json();

  
  return data.docs.slice(0, 10);
}

function transformarLibro(libro, usuarioId = 1) {
  return {
    titulo: libro.title,
    autor: libro.author_name?.[0] || "Autor desconocido",
    imagen_url: libro.cover_i
      ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
      : null,
    descripcion: libro.first_sentence?.[0] || "Sin descripción",
    año: libro.first_publish_year || 2000,
    favorito: false,
    usuario_id: usuarioId
  };
}

// Función principal que inserta los libros en la base
async function insertarLibros() {
  const libros = await obtenerLibros(); // fetch a la API
  const transformados = libros.map(l => transformarLibro(l));

  for (const libro of transformados) {
    await conexion.execute(
      `INSERT INTO Libro (titulo, autor, imagen_url, descripcion, año, favorito, usuario_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        libro.titulo,
        libro.autor,
        libro.imagen_url,
        libro.descripcion,
        libro.año,
        libro.favorito,
        libro.usuario_id
      ]
    );
  }

  console.log("✅ Libros insertados correctamente");
  await conexion.end();
}

insertarLibros();
