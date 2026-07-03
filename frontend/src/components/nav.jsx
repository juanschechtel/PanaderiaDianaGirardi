import { useState } from 'react'
import AuthModal from './AuthModal'

const getStoredUser = () => {
  const storedUser = localStorage.getItem('usuario')
  return storedUser ? JSON.parse(storedUser) : null
}

export default function Nav() {
  const [modal, setModal] = useState({ open: false, mode: 'login' })
  const [user, setUser] = useState(getStoredUser)

  const openModal = (mode) => setModal({ open: true, mode })
  const closeModal = () => setModal(prev => ({ ...prev, open: false }))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUser(null)
  }

  return (
    <>
      <nav className="w-full h-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-amber-800 tracking-tight">
          Panadería Diana Girardi
        </span>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#inicio" className="hover:text-amber-800 transition-colors">Inicio</a>
          <a href="#productos" className="hover:text-amber-800 transition-colors">Productos</a>
          <a href="#nosotros" className="hover:text-amber-800 transition-colors">Nosotros</a>
          <a href="#reservas" className="hover:text-amber-800 transition-colors">Reservas</a>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Hola, {user.first_name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-700 hover:text-amber-800 font-medium px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal('login')}
                className="text-sm text-gray-700 hover:text-amber-800 font-medium px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
              >
                Ingresar
              </button>
              <button
                onClick={() => openModal('register')}
                className="text-sm bg-amber-700 hover:bg-amber-800 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={modal.open}
        onClose={closeModal}
        mode={modal.mode}
        onAuthSuccess={setUser}
      />
    </>
  )
}
