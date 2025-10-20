import { useState } from 'react';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Biblioteca from './pages/Biblioteca';
import './styles/main.css';

function App() {
  const [vistaActual, setVistaActual] = useState("login");
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    setVistaActual("login");
  };

  return (
    <div>
      {vistaActual === "login" && (
        <Login
          onLoginExitoso={(usuario) => {
            setUsuarioActivo(usuario);
            setVistaActual("biblioteca");
          }}
        />
      )}

      {vistaActual === "biblioteca" && usuarioActivo && (
        <Biblioteca
          usuario={usuarioActivo}
          irA={setVistaActual}
          cerrarSesion={cerrarSesion}
        />
      )}

      {vistaActual === "perfil" && usuarioActivo && (
        <Perfil
          usuario={usuarioActivo}
          irA={setVistaActual}
          cerrarSesion={cerrarSesion}
        />
      )}
    </div>
  );
}

export default App;
