
import { NextResponse } from 'next/server';
import pool from '../../../lib/bs.js';

export async function GET() {
  const client = await pool.connect();
  try {
    const query = 'SELECT id_client, nombre, cc, correo, numeroC FROM cliente'; 
    const result = await client.query(query);

    return NextResponse.json({ users: result.rows }, { status: 200 });

  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  } finally {
    client.release();
  }
}