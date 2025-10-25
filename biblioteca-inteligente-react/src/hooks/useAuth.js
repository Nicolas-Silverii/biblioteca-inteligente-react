import { useState } from "react";

// Este hook maneja toda la lógica de autenticación: login, registro, sesión actual y logout.
// Guarda los datos en localStorage para que persistan entre sesiones.

export function useAuth() {
  // Estados para mostrar carga y errores en los formularios
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validación básica de email (regex simple)
  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Funciones para leer y escribir en localStorage
  const obtenerDeStorage = (clave) => JSON.parse(localStorage.getItem(clave));
  const guardarEnStorage = (clave, valor) =>
    localStorage.setItem(clave, JSON.stringify(valor));

  // Si no hay usuarios guardados, inicializamos con uno por defecto
  if (!obtenerDeStorage("usuarios")) {
    guardarEnStorage("usuarios", [
      {
        usuario: "admin",
        password: "1234",
        rol: "admin",
        nombre: "Admin",
        apellido: "Root",
      },
    ]);
  }

  // Función para iniciar sesión
  const login = async (usuario, clave) => {
    setLoading(true);
    setError("");

    // Validación de campos vacíos
    if (!usuario || !clave) {
      const mensaje = "Completá todos los campos.";
      setError(mensaje);
      setLoading(false);
      return { success: false, message: mensaje };
    }

    // Buscamos el usuario en localStorage
    const usuarios = obtenerDeStorage("usuarios") || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.password === clave
    );

    // Si no lo encontramos, mostramos error
    if (!usuarioEncontrado) {
      const mensaje = "Email o contraseña incorrectos.";
      setError(mensaje);
      setLoading(false);
      return { success: false, message: mensaje };
    }

    // Si lo encontramos, lo guardamos como usuario actual
    guardarEnStorage("usuarioActual", usuarioEncontrado);
    setLoading(false);
    return {
      success: true,
      message: `¡Bienvenido, ${usuarioEncontrado.nombre || "usuario"}!`,
      user: usuarioEncontrado,
    };
  };

  // Función para registrar un nuevo usuario
  const register = async (nombre, apellido, email, claveRegistro) => {
    setLoading(true);
    setError("");

    // Validación de campos vacíos
    if (!nombre || !apellido || !email || !claveRegistro) {
      const mensaje = "Completá todos los campos.";
      setError(mensaje);
      setLoading(false);
      return { success: false, message: mensaje };
    }

    // Validación de formato de email
    if (!validarEmail(email)) {
      const mensaje = "Email inválido.";
      setError(mensaje);
      setLoading(false);
      return { success: false, message: mensaje };
    }

    // Validación de longitud de contraseña
    if (claveRegistro.length < 4) {
      const mensaje = "La contraseña debe tener al menos 4 caracteres.";
      setError(mensaje);
      setLoading(false);
      return { success: false, message: mensaje };
    }

    // Verificamos si el email ya está registrado
    const usuarios = obtenerDeStorage("usuarios") || [];
    if (usuarios.some((u) => u.usuario === email)) {
      const mensaje = "Ese email ya está registrado.";
      setError(mensaje);
      setLoading(false);
      return { success: false, message: mensaje };
    }

    // Creamos el nuevo usuario y lo guardamos
    const nuevoUsuario = {
      usuario: email,
      password: claveRegistro,
      rol: "usuario",
      nombre,
      apellido,
    };

    usuarios.push(nuevoUsuario);
    guardarEnStorage("usuarios", usuarios);

    setLoading(false);
    return {
      success: true,
      message: "¡Registro exitoso! Ahora podés iniciar sesión.",
      user: nuevoUsuario,
    };
  };

  // Devuelve el usuario que está logueado actualmente
  const getUsuarioActual = () => obtenerDeStorage("usuarioActual");

  // Cierra la sesión actual
  const logout = () => {
    localStorage.removeItem("usuarioActual");
  };

  // Exportamos todas las funciones y estados que necesitamos en los componentes
  return { login, register, getUsuarioActual, logout, loading, error };
}
