import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import ModalAjustes from "../components/ModalAjustes";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function Login({ onLoginExitoso, tema, setTema, fuente, setFuente }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("error");
  const [mostrarAjustes, setMostrarAjustes] = useState(false);

  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const enviarInicioSesion = async (e) => {
    e.preventDefault();
    const result = await login(usuario, clave);
    if (result.success) {
      setMensaje(result.message);
      setTipoMensaje("confirm");
      onLoginExitoso(result.user);
      setTimeout(() => navigate("/biblioteca"), 1500);
    } else {
      setMensaje(result.message);
      setTipoMensaje("error");
    }
  };

  const enviarRegistro = async (e) => {
    e.preventDefault();
    const result = await register(nombre, apellido, usuario, clave);
    setMensaje(result.message);
    setTipoMensaje(result.success ? "confirm" : "error");
    if (result.success) {
      setModoRegistro(false);
      setNombre("");
      setApellido("");
      setUsuario("");
      setClave("");
    }
  };

  return (
    <>
      <div className="logo-login">
        <img id="logo-login" src="/img/logo2.png" alt="Logo de login" />
      </div>

      <div className="login-wrapper">
        <main>
          <section id="seccion-inicio">
            {!modoRegistro ? (
              <>
                <h2>Iniciar sesión</h2>
                <form onSubmit={enviarInicioSesion}>
                  <Input type="email" placeholder="Email" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                  <Input type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
                  <div className="botones-login">
                    <Button text={loading ? "Cargando..." : "Ingresar"} type="submit" disabled={loading} />
                  </div>
                  {mensaje && <p className={`mensaje-feedback ${tipoMensaje}`}>{mensaje}</p>}
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
                  {mensaje && <p className={`mensaje-feedback ${tipoMensaje}`}>{mensaje}</p>}
                </form>
                <button className="boton boton-secundario" onClick={() => setModoRegistro(false)}>
                  ¿Ya tenés cuenta? Volver al login
                </button>
              </>
            )}
          </section>
        </main>
      </div>

      <ModalAjustes
        visible={mostrarAjustes}
        onClose={() => setMostrarAjustes(false)}
        tema={tema}
        setTema={setTema}
        fuente={fuente}
        setFuente={setFuente}
      />
    </>
  );
}

export default Login;
