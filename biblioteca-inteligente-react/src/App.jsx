import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Biblioteca from "./pages/Biblioteca";
import { useAuth } from "./hooks/useAuth";
import "./styles/main.css";

// Componente que maneja la lógica de sesión y navegación protegida
function AppWrapper() {
  const { getUsuarioActual, logout } = useAuth(); // Hook personalizado para manejar autenticación
  const [usuarioActivo, setUsuarioActivo] = useState(null); // Estado local para guardar el usuario logueado
  const navigate = useNavigate(); // Hook para redireccionar entre rutas

  // Cuando se abre la app, revisamos si ya hay un usuario guardado
  useEffect(() => {
    const usuario = getUsuarioActual();
    if (usuario) {
      setUsuarioActivo(usuario);
    }
  }, []);

  // Cierra la sesión y redirige al login
  const cerrarSesion = () => {
    logout();
    setUsuarioActivo(null);
    navigate("/");
  };

  // Función para navegar entre vistas internas
  const irA = (ruta) => navigate(`/${ruta}`);

  return (
    <Routes>
      {/* Ruta raíz: siempre muestra el login. Al iniciar sesión, redirige a la biblioteca */}
      <Route
        path="/"
        element={
          <Login
            onLoginExitoso={(usuario) => {
              setUsuarioActivo(usuario);
              navigate("/biblioteca"); // Redirige a la biblioteca al iniciar sesión
            }}
          />
        }
      />

      {/* Ruta del perfil: protegida, solo accesible si hay usuario */}
      <Route
        path="/perfil"
        element={
          usuarioActivo ? (
            <Perfil usuario={usuarioActivo} irA={irA} cerrarSesion={cerrarSesion} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Ruta de la biblioteca: también protegida */}
      <Route
        path="/biblioteca"
        element={
          usuarioActivo ? (
            <Biblioteca usuario={usuarioActivo} irA={irA} cerrarSesion={cerrarSesion} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Cualquier ruta desconocida redirige al login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// // Usamos BrowserRouter para que la app tenga navegación fluida entre rutas

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
