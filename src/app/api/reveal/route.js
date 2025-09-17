
import { NextResponse } from 'next/server';
import pool from '../../../lib/bs.js';

export async function POST(request) {
  const client = await pool.connect();
  try {
    const { userId, field } = await request.json();
    
    let dbField;
    if (field === 'email') {
      dbField = 'correo';
    } else if (field === 'phone') {
      dbField = 'numeroC';
    } else {
      return NextResponse.json({ message: 'Campo inválido' }, { status: 400 });
    }

    // La clave es desencriptar directamente en la consulta SQL
    const query = `SELECT pgp_sym_decrypt(${dbField}, 'santo') AS decrypted_value FROM cliente WHERE id_client = $1`;
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    // El resultado de la consulta ya es el valor desencriptado
    const decryptedValue = result.rows[0].decrypted_value;

    return NextResponse.json({ value: decryptedValue }, { status: 200 });

  } catch (error) {
    console.error('Error al revelar la información:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  } finally {
    client.release();
  }
}