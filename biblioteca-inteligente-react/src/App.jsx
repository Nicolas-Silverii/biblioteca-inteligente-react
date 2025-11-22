import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Biblioteca from "./pages/Biblioteca";
import { useAuth } from "./hooks/useAuth";
import "./styles/main.css";

// Componente que gestiona rutas y estado global
function AppWrapper({ tema, setTema, fuente, setFuente }) {
  const { getUsuarioActual, logout } = useAuth();
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const navigate = useNavigate();

  // Al iniciar, verificamos si hay usuario logueado
  useEffect(() => {
    const usuario = getUsuarioActual();
    if (usuario) {
      setUsuarioActivo(usuario);
    }
  }, []);

  // Aplicar clases al body según tema y fuente + guardar preferencias
  useEffect(() => {
    const clasesBase = ["login-page", tema, `fuente-${fuente}`];
    document.body.className = clasesBase.join(" ");

    // Guardamos preferencias en localStorage
    localStorage.setItem("preferenciaTema", tema);
    localStorage.setItem("preferenciaFuente", fuente);
  }, [tema, fuente]);

  const cerrarSesion = () => {
    logout();
    setUsuarioActivo(null);
    navigate("/");
  }; 

  const irA = (ruta) => navigate(`/${ruta}`);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login
            onLoginExitoso={(usuario) => {
              setUsuarioActivo(usuario);
              navigate("/biblioteca");
            }}
            tema={tema}
            setTema={setTema}
            fuente={fuente}
            setFuente={setFuente}
          />
        }
      />
      <Route
        path="/perfil"
        element={
          usuarioActivo ? (
            <Perfil
              usuario={usuarioActivo}
              irA={irA}
              cerrarSesion={cerrarSesion}
              tema={tema}
              setTema={setTema}
              fuente={fuente}
              setFuente={setFuente}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/biblioteca"
        element={
          usuarioActivo ? (
            <Biblioteca
              usuario={usuarioActivo}
              irA={irA}
              cerrarSesion={cerrarSesion}
              tema={tema}
              setTema={setTema}
              fuente={fuente}
              setFuente={setFuente}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// Componente principal que inicializa tema y fuente desde localStorage
export default function App() {
  const temaInicial = localStorage.getItem("preferenciaTema") || "claro";
  const fuenteInicial = localStorage.getItem("preferenciaFuente") || "mediana";

  const [tema, setTema] = useState(temaInicial);
  const [fuente, setFuente] = useState(fuenteInicial);

  return (
    <BrowserRouter>
      <AppWrapper
        tema={tema}
        setTema={setTema}
        fuente={fuente}
        setFuente={setFuente}
      />
    </BrowserRouter>
  );
}
