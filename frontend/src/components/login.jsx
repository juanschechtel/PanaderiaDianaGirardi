import { useState } from 'react';

const buttonStyles = 'text-stone-900 hover:bg-rose-100'

export default function Login() {

  // 1. Guardamos lo que escribe el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Cuando aprieta el botón
  const handleLogin = async () => {

    // 3. Le mandamos los datos al backend
    const respuesta = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await respuesta.json();

    // 4. Si el backend nos devuelve un token, el login fue exitoso
    if (data.token) {
      localStorage.setItem('token', data.token); // guardamos la sesión
      alert('¡Bienvenido!');
    } else {
      alert('Email o contraseña incorrectos');
    }
  };

  // 5. Lo que se muestra en pantalla
  return (
    <div>
      <h2>Iniciar sesión</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className={buttonStyles} onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}

