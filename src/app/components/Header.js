import styles from './Header.module.css';

export default function Header({ isLoggedIn, onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <i className="fas fa-database"></i>
        <h1>Sistema de Encriptación</h1>
      </div>
      
      {isLoggedIn && (
        <div className={styles.userSection}>
          <button onClick={onLogout} className={styles.logoutButton}>
            <i className="fas fa-sign-out-alt"></i>
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
}