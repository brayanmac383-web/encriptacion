'use client';

import { useState, useEffect } from 'react';
import styles from './DataTable.module.css';

export default function DataTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [revealedData, setRevealedData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Simulación de carga de datos desde PostgreSQL
      const response = await fetch('/api/users');
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Error al cargar los datos');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const revealInfo = async (userId, field) => {
    try {
      const response = await fetch('/api/reveal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, field }),
      });

      const data = await response.json();

      if (response.ok) {
        setRevealedData(prev => ({
          ...prev,
          [`${userId}-${field}`]: data.value
        }));
      } else {
        setError(data.message || 'Error al revelar la información');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <i className="fas fa-spinner fa-spin"></i>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button onClick={fetchUsers} className={styles.retryButton}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dataContainer}>
      <div className={styles.dataHeader}>
        <h2>Gestión de Usuarios</h2>
        <p>Información de personas registradas en el sistema</p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Número de Celular</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.document}</td>
                <td>{user.name}</td>
                <td>
                  {revealedData[`${user.id}-email`] ? (
                    <span className={styles.revealedData}>
                      {revealedData[`${user.id}-email`]}
                    </span>
                  ) : (
                    <div className={styles.hiddenData}>
                      <span>•••••••••••</span>
                      <button
                        onClick={() => revealInfo(user.id, 'email')}
                        className={styles.revealButton}
                        title="Revelar correo"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {revealedData[`${user.id}-phone`] ? (
                    <span className={styles.revealedData}>
                      {revealedData[`${user.id}-phone`]}
                    </span>
                  ) : (
                    <div className={styles.hiddenData}>
                      <span>•••••••••••</span>
                      <button
                        onClick={() => revealInfo(user.id, 'phone')}
                        className={styles.revealButton}
                        title="Revelar celular"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.infoBox}>
        <i className="fas fa-info-circle"></i>
        <p>Los datos sensibles están encriptados en la base de datos. Use el botón de ojo para revelarlos temporalmente.</p>
      </div>
    </div>
  );
}