import React, { useState, useEffect } from "react";
import Input from "../components/Input"; 
import Button from "../components/Button"; 
import Modal from "../components/Modal"; 
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"; 
import "../styles/main.css";

function Login({ onLoginExitoso }) {
  // Estados para los campos del formulario
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // Estado para alternar entre login y registro
  const [modoRegistro, setModoRegistro] = useState(false);

  // Estado para mostrar el modal con mensajes
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Traemos funciones del hook de autenticación
  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate();

  // Cuando se monta el componente, le damos estilo al body
  useEffect(() => {
    document.body.className = "login-page claro fuente-mediana";
    return () => {
      document.body.className = "";
    };
  }, []);

  // Función que se ejecuta al enviar el formulario de login
  const enviarInicioSesion = async (e) => {
    e.preventDefault();
    const result = await login(usuario, clave);
    if (result.success) {
      setMensaje(`¡Bienvenido, ${result.user.nombre || "usuario"}!`);
      setMostrarModal(true);
      onLoginExitoso(result.user); // Guardamos el usuario en App.jsx
      setTimeout(() => navigate("/perfil"), 1500); // Redirigimos al perfil
    } else {
      setMensaje(error || "Error al iniciar sesión");
      setMostrarModal(true);
    }
  };

  // Función que se ejecuta al enviar el formulario de registro
  const enviarRegistro = async (e) => {
    e.preventDefault();
    const result = await register(nombre, apellido, usuario, clave);
    setMensaje(result.message || "Error al registrarse");
    setMostrarModal(true);
    if (result.success) {
      // Si se registró bien, volvemos al modo login y limpiamos los campos
      setModoRegistro(false);
      setNombre("");
      setApellido("");
      setUsuario("");
      setClave("");
    }
  };

  // Cierra el modal y, si el mensaje fue de éxito, vuelve al login
  const cerrarModal = () => {
    setMostrarModal(false);
    if (mensaje.includes("Registro exitoso")) {
      setModoRegistro(false);
    }
  };

  return (
    <>
      {/* Logo de la app */}
      <div className="logo-libropolis">
        <img src="/img/logo2.png" alt="Logo Libropolis" />
      </div>

      <div className="login-wrapper">
        <main>
          <section id="seccion-inicio">
            {/* Alternamos entre login y registro */}
            {!modoRegistro ? (
              <>
                <h2>Iniciar sesión</h2>
                <form onSubmit={enviarInicioSesion}>
                  <Input type="email" placeholder="Email" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                  <Input type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
                  <div className="botones-login">
                    <Button text={loading ? "Cargando..." : "Ingresar"} type="submit" disabled={loading} />
                  </div>
                </form>
                <button className="boton boton-secundario" onClick={() => setModoRegistro(true)}>
                  ¿No tenés cuenta? Registrate acá
                </button>
              </>
            ) : (
              <>
                <h2>Registrarse</h2>
                <form onSubmit={enviarRegistro}>
                  <Input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  <Input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                  <Input type="email" placeholder="Email" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                  <Input type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
                  <div className="botones-login">
                    <Button text={loading ? "Cargando..." : "Registrarme"} type="submit" disabled={loading} />
                  </div>
                </form>
                <button className="boton boton-secundario" onClick={() => setModoRegistro(false)}>
                  ¿Ya tenés cuenta? Volver al login
                </button>
              </>
            )}

            {/* Modal para mostrar mensajes de éxito o error */}
            {mostrarModal && (
              <Modal mensaje={mensaje} tipo={mensaje.includes("exitoso") ? "confirm" : "error"} onClose={cerrarModal} />
            )}
          </section>
        </main>
      </div>

      {/* Footer con info legal */}
      <footer className="footer-login">
        <p>© 2025 Biblioteca Interactiva – Todos los derechos reservados</p>
        <p>
          <a href="#">Términos y condiciones</a> | <a href="#">Política de privacidad</a>
        </p>
      </footer>
    </>
  );
}

export default Login;
