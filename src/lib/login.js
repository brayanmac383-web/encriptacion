
import pool from './bs.js';
import bcrypt from 'bcrypt';

/**
 * @param {string} nombre El nombre de usuario a verificar.
 * @param {string} pass La contraseña a verificar.
 * @returns {Promise<boolean>}
 */
export async function verifyCredentials(nombre, pass) {
  const client = await pool.connect();
  try {
    
    const query = 'SELECT pass FROM usuario WHERE nombre = $1';
    const result = await client.query(query, [nombre]);

    if (result.rows.length === 0) {
      return false;
    }

    const storedHash = result.rows[0].pass;

    const match = await bcrypt.compare(pass, storedHash);
    
    return match;

  } catch (error) {
    console.error('Error al verificar las credenciales:', error);
    return false;
  } finally {
    client.release();
  }
}