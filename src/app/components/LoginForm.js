// src/components/LoginForm.js

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter desde next/navigation
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [nombre, setNombre] = useState('');
  const [pass, setPass] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esExito, setEsExito] = useState(false);
  
  const router = useRouter(); // Llama al hook useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMensaje(''); 
    setEsExito(false);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, pass }),
    });

    const data = await res.json();
    setMensaje(data.message);
    setEsExito(res.ok);

    if (res.ok) {
      console.log('Login exitoso. ¡Redirigiendo!');
      router.push('/DataTable'); // Redirige de forma eficiente
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre de usuario:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pass">Contraseña:</label>
          <input
            type="password"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensaje && (
        <p className={esExito ? styles.exito : styles.mensaje}>
          {mensaje}
        </p>
      )}
    </div>
  );
}