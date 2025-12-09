'use client'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './components/ThemeProvider'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}