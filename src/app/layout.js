import './globals.css'

export const metadata = {
  title: 'Sistema de Encriptación PostgreSQL',
  description: 'Sistema seguro de autenticación y gestión de datos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}