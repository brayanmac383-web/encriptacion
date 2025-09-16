import './globals.css'

export const metadata = {
  title: 'Sistema de Encriptación PostgreSQL',
  description: 'Sistema seguro de autenticación y gestión de datos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}