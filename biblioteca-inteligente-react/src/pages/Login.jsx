import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";

function Login({ onLoginExitoso }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [claveRegistro, setClaveRegistro] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);


  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const obtenerDeStorage = (clave) => JSON.parse(localStorage.getItem(clave));
  const guardarEnStorage = (clave, valor) =>
    localStorage.setItem(clave, JSON.stringify(valor));

  // Inicializar usuarios si no existen
  if (!obtenerDeStorage("usuarios")) {
    guardarEnStorage("usuarios", [
      { usuario: "admin", password: "1234", rol: "admin" },
    ]);
  }

  const enviarInicioSesion = (e) => {
    e.preventDefault();

    if (!usuario || !clave) {
      setMensaje("Completá todos los campos.");
      setMostrarModal(true);
      return;
    }

    const usuarios = obtenerDeStorage("usuarios") || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.password === clave
    );

    if (!usuarioEncontrado) {
      setMensaje("Email o contraseña incorrectos.");
      setMostrarModal(true);
      return;
    }

    setMensaje(`¡Bienvenido, ${usuarioEncontrado.nombre || "usuario"}!`);
    setMostrarModal(true);
    onLoginExitoso(usuarioEncontrado);

  };

  const enviarRegistro = (e) => {
  e.preventDefault();

  if (!nombre || !apellido || !email || !claveRegistro) {
    setMensaje("Completá todos los campos.");
    setMostrarModal(true);
    return;
  }

  if (!validarEmail(email)) {
    setMensaje("Email inválido.");
    setMostrarModal(true);
    return;
  }

  if (claveRegistro.length < 4) {
    setMensaje("La contraseña debe tener al menos 4 caracteres.");
    setMostrarModal(true);
    return;
  }

  const usuarios = obtenerDeStorage("usuarios") || [];
  if (usuarios.some((u) => u.usuario === email)) {
    setMensaje("Ese email ya está registrado.");
    setMostrarModal(true);
    return;
  }

  usuarios.push({
    usuario: email,
    password: claveRegistro,
    rol: "usuario",
    nombre,
    apellido,
  });
  guardarEnStorage("usuarios", usuarios);

  setMensaje("¡Registro exitoso! Ahora podés iniciar sesión.");
  setMostrarModal(true);
  setRegistroExitoso(true);
  setNombre("");
  setApellido("");
  setEmail("");
  setClaveRegistro("");
};


const cerrarModal = () => {
  setMostrarModal(false);
  if (registroExitoso) {
    setMostrarRegistro(false);
    setMensaje("");
    setUsuario("");
    setClave("");
    setRegistroExitoso(false); 
  }
};



  return (
    <main className="login-page claro fuente-mediana">
      <header>
        <div id="logo-container">
          <img src="/img/logo.png" alt="Logo Biblioteca" id="logo" />
        </div>
      </header>

      {!mostrarRegistro ? (
        <section id="seccion-inicio">
          <h2>Iniciar sesión</h2>
          <form onSubmit={enviarInicioSesion}>
            <Input
              type="text"
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
              <Button text="Ingresar" type="submit" />
              <Button
                text="Crear cuenta"
                onClick={() => setMostrarRegistro(true)}
              />
            </div>
          </form>
        </section>
      ) : (
        <section id="seccion-registro">
          <h2>Registrarse</h2>
          <form onSubmit={enviarRegistro}>
            <Input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={claveRegistro}
              onChange={(e) => setClaveRegistro(e.target.value)}
              required
            />
            <div className="botones-login">
              <Button text="Registrarse" type="submit" />
              <Button
                text="¿Ya tenés cuenta? Iniciá sesión"
                onClick={() => setMostrarRegistro(false)}
              />
            </div>
          </form>
        </section>
      )}

      <footer>
        <p>© 2025 Biblioteca Interactiva – Todos los derechos reservados</p>
        <p>
          <a href="#">Términos y condiciones</a> |{" "}
          <a href="#">Política de privacidad</a>
        </p>
      </footer>

      {mostrarModal && (
        <Modal
          mensaje={mensaje}
          tipo={
            mensaje.includes("¡Bienvenido") || mensaje.includes("exitoso")
              ? "confirm"
              : "error"
          }
          onClose={cerrarModal}
        />
      )}
    </main>
  );
}

export default Login;
