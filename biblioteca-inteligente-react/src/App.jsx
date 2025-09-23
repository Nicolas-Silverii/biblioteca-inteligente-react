import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [mostrarHome, setMostrarHome] = useState(false);

  return (
    <div>
      {mostrarHome ? (
        <Home />
      ) : (
        <Login setMostrarHome={setMostrarHome} />
      )}
    </div>
  );
}

export default App;
