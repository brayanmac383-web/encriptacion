'use client';

import { useState } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import styles from './page.module.css';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main className={styles.main}>
        {currentView === 'login' && <LoginForm onLogin={handleLogin} />}
        {currentView === 'dashboard' && <DataTable />}
      </main>

      <footer className={styles.footer}>
        <p>Sistema de Encriptación PostgreSQL - 2023</p>
      </footer>
    </div>
  );
}



