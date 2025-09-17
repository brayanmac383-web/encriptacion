'use client';

import { useState, useEffect } from 'react';
import styles from './../components/DataTable.module.css';

export default function DataTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revealedData, setRevealedData] = useState({});

  // Función para obtener los datos de la API de clientes
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clients');
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

  // Función para revelar datos encriptados
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
          [`${userId}-${field}`]: data.value,
        }));
      } else {
        alert(data.message || 'No se pudo revelar la información.');
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={fetchUsers} className={styles.retryButton}>
          Reintentar
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.noUsersContainer}>
        <p>No se encontraron usuarios.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Gestión de Usuarios</h1>
        <p>Información de personas registradas en el sistema</p>
      </header>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
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
              <tr key={user.id_client}>
                <td>{user.cc}</td>
                <td>{user.nombre}</td>
                <td>
                  {revealedData[`${user.id_client}-email`] ? (
                    <span className={styles.revealedData}>{revealedData[`${user.id_client}-email`]}</span>
                  ) : (
                    <div className={styles.hiddenData}>
                      <span>•••••••••••</span>
                      <button
                        onClick={() => revealInfo(user.id_client, 'email')}
                        className={styles.revealButton}
                        title="Revelar correo"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {revealedData[`${user.id_client}-phone`] ? (
                    <span className={styles.revealedData}>{revealedData[`${user.id_client}-phone`]}</span>
                  ) : (
                    <div className={styles.hiddenData}>
                      <span>•••••••••••</span>
                      <button
                        onClick={() => revealInfo(user.id_client, 'phone')}
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
        <span>Los datos sensibles están encriptados en la base de datos. Use el botón de ojo para revelarlos temporalmente.</span>
      </div>
    </div>
  );
}