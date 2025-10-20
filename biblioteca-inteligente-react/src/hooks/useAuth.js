import { useState } from "react";

export function useAuth() {
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

  const login = (usuario, clave) => {
    if (!usuario || !clave) {
      return { success: false, message: "Completá todos los campos." };
    }

    const usuarios = obtenerDeStorage("usuarios") || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.password === clave
    );

    if (!usuarioEncontrado) {
      return { success: false, message: "Email o contraseña incorrectos." };
    }

    return {
      success: true,
      message: `¡Bienvenido, ${usuarioEncontrado.nombre || "usuario"}!`,
      user: usuarioEncontrado,
    };
  };

  const register = (nombre, apellido, email, claveRegistro) => {
    if (!nombre || !apellido || !email || !claveRegistro) {
      return { success: false, message: "Completá todos los campos." };
    }

    if (!validarEmail(email)) {
      return { success: false, message: "Email inválido." };
    }

    if (claveRegistro.length < 4) {
      return {
        success: false,
        message: "La contraseña debe tener al menos 4 caracteres.",
      };
    }

    const usuarios = obtenerDeStorage("usuarios") || [];
    if (usuarios.some((u) => u.usuario === email)) {
      return { success: false, message: "Ese email ya está registrado." };
    }

    usuarios.push({
      usuario: email,
      password: claveRegistro,
      rol: "usuario",
      nombre,
      apellido,
    });
    guardarEnStorage("usuarios", usuarios);

    return {
      success: true,
      message: "¡Registro exitoso! Ahora podés iniciar sesión.",
    };
  };

  return { login, register, loading, error };
}
