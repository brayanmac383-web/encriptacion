'use client';

import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulación de autenticación con PostgreSQL
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin();
      } else {
        setError(data.message || 'Error en la autenticación');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2>Iniciar Sesión</h2>
          <p>Ingrese sus credenciales para acceder al sistema</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Verificando...
              </>
            ) : (
              <>
                <i className="fas fa-lock"></i>
                Ingresar
              </>
            )}
          </button>
        </form>

        <div className={styles.loginInfo}>
          <h3>Información del Sistema</h3>
          <p>Este sistema utiliza:</p>
          <ul>
            <li>PostgreSQL con extensión pgcrypto</li>
            <li>Contraseñas encriptadas con crypt()</li>
            <li>Datos sensibles protegidos con encriptación</li>
          </ul>
        </div>
      </div>
    </div>
  );
}