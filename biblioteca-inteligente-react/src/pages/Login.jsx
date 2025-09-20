import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form>
        <Input type="text" placeholder="Usuario" />
        <Input type="password" placeholder="Contraseña" />
        <Button text="Ingresar" />
      </form>
    </div>
  );
}

export default Login;
