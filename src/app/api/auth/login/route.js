

import { NextResponse } from 'next/server';

import { verifyCredentials } from '../../../../lib/login.js';

export async function POST(request) {
  try {
    const { nombre, pass } = await request.json();
    const isValid = await verifyCredentials(nombre, pass);

    if (isValid) {
      
      return NextResponse.json({ message: 'Login exitoso', success: true }, { status: 200 });
    } else {
      
      return NextResponse.json({ message: 'Credenciales inválidas', success: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}