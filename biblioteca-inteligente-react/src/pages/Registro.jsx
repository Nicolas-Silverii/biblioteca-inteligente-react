import {useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";

const Registro = () => {
    const [nombre, setNombre]= useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass]= useState('');
    const [mensaje, setMensaje] = useState('');
    const [mostrarModal, setMostrarModal] = useState('');

    const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const obtenetDeStorage = (clave) => JSON.parse(localStorage.getItem(clave))
    const guardarEnStorage = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !email || !pass ){
            setMensaje('Completá todos los campos.')
            setMostrarModal(true);
            return;
        }

        if (!validarEmail(email)){
            setMensaje('Email inválido.')
            setMostrarModal(true);
            return;
        }

        if (pass.length <4) {
            setMensaje('La contraseña debe tener al menos 4 caracteres.')
            setMostrarModal(true);
            return;
        }

        const usuarios = obtenetDeStorage('usuarios') || [];
        if (usuarios.some(u => u.usuario === email)) {
            setMensaje('Ese email ya está registrado.')
            setMostrarModal(true);
            return;
        }

        usuarios.push({usuario: email, password: pass, rol: 'usuario', nombre, apellido});
        guardarEnStorage('usuarios', usuarios);

        setMensaje('¡Registro exitoso! Ahora podés iniciar sesión.');
        setMostrarModal(true);
        setNombre('');
        setApellido('');
        setEmail('');
        setPass('');
    };
 return (
    <form onSubmit={handleSubmit}>
      <Input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <Input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Contraseña" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <Button type="submit" texto="Registrarse" />

      {mostrarModal && (
        <Modal
          mensaje={mensaje}
          tipo={mensaje.includes('exitoso') ? 'confirm' : 'error'}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </form>

);


};
export default Registro;