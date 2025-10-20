import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login({ onLoginExitoso }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const enviarInicioSesion = async (e) => {
    e.preventDefault();
    const result = await login(usuario, clave);
    if (result.success) {
      setMensaje(`¡Bienvenido, ${result.user.nombre || "usuario"}!`);
      setMostrarModal(true);
      onLoginExitoso(result.user);
      setTimeout(() => navigate("/perfil"), 1500);
    } else {
      setMensaje(error || "Error al iniciar sesión");
      setMostrarModal(true);
    }
  };

  const cerrarModal = () => setMostrarModal(false);

  return (
    <main className="login-page claro fuente-mediana">
      <section id="seccion-inicio">
        <h2>Iniciar sesión</h2>
        <form onSubmit={enviarInicioSesion}>
          <Input
            type="email"
            placeholder="Email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          <div className="botones-login">
            <Button text="Ingresar" type="submit" disabled={loading} />
          </div>
        </form>
      </section>

      {mostrarModal && (
        <Modal
          mensaje={mensaje}
          tipo={mensaje.includes("Bienvenido") ? "confirm" : "error"}
          onClose={cerrarModal}
        />
      )}
    </main>
  );
}

export default Login;
