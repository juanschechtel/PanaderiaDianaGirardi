import { useState } from 'react'
import AuthModal from './AuthModal'

const getStoredUser = () => {
  const storedUser = localStorage.getItem('usuario')
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem('usuario')
    return null
  }
}

export default function Nav() {
  const [modal, setModal] = useState({ open: false, mode: 'login' })
  const [user, setUser] = useState(getStoredUser)
  const userName = user?.first_name || user?.nombre || user?.username || user?.email

  const openModal = (mode) => setModal({ open: true, mode })
  const closeModal = () => setModal(prev => ({ ...prev, open: false }))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUser(null)
  }

  const navBtnClass =
    'text-sm font-medium px-4 py-2 rounded-lg transition-colors min-w-[6.5rem] text-center'

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 w-full bg-white border-b border-gray-200 px-6 py-4 grid grid-cols-3 items-center">
        <span className="text-lg font-semibold text-amber-800 tracking-tight">
          Panadería Diana Girardi
        </span>

        <div className="hidden md:flex items-center justify-center gap-6 text-sm text-gray-600">
          <a href="#inicio" className="hover:text-amber-800 transition-colors">Inicio</a>
          <a href="#productos" className="hover:text-amber-800 transition-colors">Productos</a>
          <a href="#nosotros" className="hover:text-amber-800 transition-colors">Nosotros</a>
          <a href="#reservas" className="hover:text-amber-800 transition-colors">Reservas</a>
        </div>

        <div className="flex items-center justify-end gap-2 min-w-[15rem]">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700 truncate max-w-[8rem]">
                Hola, {userName}
              </span>
              <button
                onClick={handleLogout}
                className={`${navBtnClass} text-gray-700 hover:text-amber-800 hover:bg-amber-50`}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal('login')}
                className={`${navBtnClass} text-gray-700 hover:text-amber-800 hover:bg-amber-50`}
              >
                Ingresar
              </button>
              <button
                onClick={() => openModal('register')}
                className={`${navBtnClass} text-gray-700 hover:text-amber-800 hover:bg-amber-50`}
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
