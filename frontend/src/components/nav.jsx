import { useEffect, useState } from 'react'
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

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#productos', label: 'Productos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#reservas', label: 'Reservas' },
]

export default function Nav() {
  const [modal, setModal] = useState({ open: false, mode: 'login' })
  const [user, setUser] = useState(getStoredUser)
  const [menuOpen, setMenuOpen] = useState(false)
  const userName = user?.first_name || user?.nombre || user?.username || user?.email

  const openModal = (mode) => {
    setMenuOpen(false)
    setModal({ open: true, mode })
  }
  const closeModal = () => setModal(prev => ({ ...prev, open: false }))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUser(null)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navBtnClass =
    'text-sm font-medium px-3 py-2 sm:px-4 rounded-lg transition-colors text-center whitespace-nowrap'

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 w-full bg-white border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <span className="min-w-0 truncate text-base font-semibold tracking-tight text-amber-800 sm:text-lg">
            Panadería Diana Girardi
          </span>

          <div className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              {user ? (
                <>
                  <span className="max-w-[8rem] truncate text-sm font-medium text-gray-700 lg:max-w-[12rem]">
                    Hola, {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className={`${navBtnClass} text-gray-700 hover:bg-amber-50 hover:text-amber-800`}
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openModal('login')}
                    className={`${navBtnClass} text-gray-700 hover:bg-amber-50 hover:text-amber-800`}
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={() => openModal('register')}
                    className={`${navBtnClass} text-gray-700 hover:bg-amber-50 hover:text-amber-800`}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-amber-50 hover:text-amber-800 md:hidden"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(open => !open)}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3 sm:hidden">
              {user ? (
                <>
                  <span className="px-3 text-sm font-medium text-gray-700">
                    Hola, {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className={`${navBtnClass} text-left text-gray-700 hover:bg-amber-50 hover:text-amber-800`}
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openModal('login')}
                    className={`${navBtnClass} text-left text-gray-700 hover:bg-amber-50 hover:text-amber-800`}
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={() => openModal('register')}
                    className={`${navBtnClass} text-left text-gray-700 hover:bg-amber-50 hover:text-amber-800`}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        )}
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
