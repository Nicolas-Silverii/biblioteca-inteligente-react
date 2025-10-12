import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [claveRegistro, setClaveRegistro] = useState("");

  const enviarInicioSesion = (e) => e.preventDefault();
  const enviarRegistro = (e) => e.preventDefault();

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
    </main>
  );
}

export default Login;
