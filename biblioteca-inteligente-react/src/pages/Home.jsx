import Card from '../components/Card';
import libros from '../data/libros.json';

function Home() {
  return (
    <div className="home">
      <h2>Biblioteca Inteligente</h2>
      <div className="card-grid">
        {libros.map((libro, index) => (
          <Card
            key={index}
            titulo={libro.titulo}
            autor={libro.autor}
            imagen={libro.imagen}
            descripcion={libro.descripcion}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
