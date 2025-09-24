import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Biblioteca from './pages/Biblioteca';

function App() {
  return (
    <div>
       <Login /> 
      {/* <Perfil /> */} 
      {/*<Biblioteca />*/}
    </div> // De esta forma voy alternando las vistas, ya que no implementé lógica aún
  );
}

export default App;
