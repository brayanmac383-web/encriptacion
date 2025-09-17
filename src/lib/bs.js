// En /src/lib/bs.js
import { Pool } from 'pg';

console.log('Usuario de la base de datos que se está utilizando:', process.env.DB_USER);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: parseInt(process.env.DB_PORT, 10),
});

export default pool;