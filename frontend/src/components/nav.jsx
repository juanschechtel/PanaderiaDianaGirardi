import { useEffect, useState } from 'react'
import AuthModal from './AuthModal'
import CartButton from './CartButton'
import CartDrawer from './CartDrawer'

const BRAND = '#7B2D3E' // burdeos de marca — usado en botones y acentos del nav

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
  const [scrolled, setScrolled] = useState(false)
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

  // Navbar transparente sobre el hero, sólida al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Si el mobile menu está abierto o ya se scrolleó, el nav es sólido.
  const isSolid = scrolled || menuOpen

  const navBtnClass =
    'text-sm font-medium px-3 py-2 sm:px-4 rounded-lg transition-colors text-center whitespace-nowrap'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-300 ${
          isSolid
            ? 'bg-[#F5EDD8] border-b border-black/5 shadow-sm'
            : 'bg-transparent border-b border-white/0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <div className="min-w-0 leading-tight">
            <span
              className={`block truncate font-serif text-lg font-semibold tracking-tight sm:text-xl ${
                isSolid ? 'text-[#7B2D3E]' : 'text-white'
              }`}
            >
              Diana Girardi
            </span>
            <span
              className={`block text-[10px] font-semibold tracking-[0.2em] ${
                isSolid ? 'text-amber-700' : 'text-amber-300/90'
              }`}
            >
              PANADERÍA ARTESANAL
            </span>
          </div>

          {/* Links */}
          <div
            className={`hidden items-center gap-6 text-sm md:flex ${
              isSolid ? 'text-gray-700' : 'text-white/90'
            }`}
          >
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isSolid ? 'hover:text-[#7B2D3E]' : 'hover:text-amber-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className={`hidden h-9 w-9 items-center justify-center rounded-full transition-colors sm:flex ${
                isSolid
                  ? 'text-gray-700 hover:bg-black/5'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            {/* Carrito: visible siempre, mobile y desktop */}
            <CartButton
              className={
                isSolid
                  ? 'text-gray-700 hover:bg-black/5'
                  : 'text-white hover:bg-white/10'
              }
            />

            <div className="hidden items-center gap-2 sm:flex">
              {user ? (
                <>
                  <span
                    className={`max-w-[8rem] truncate text-sm font-medium lg:max-w-[12rem] ${
                      isSolid ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    Hola, {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className={`${navBtnClass} ${
                      isSolid
                        ? 'text-gray-700 hover:bg-black/5'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openModal('login')}
                    className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                      isSolid
                        ? 'border-black/15 text-gray-800 hover:bg-black/5'
                        : 'border-white/40 text-white hover:bg-white/10'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <path d="M10 17l5-5-5-5" />
                      <path d="M15 12H3" />
                    </svg>
                    Ingresar
                  </button>
                  <button
                    onClick={() => openModal('register')}
                    className={`${navBtnClass} ${
                      isSolid
                        ? 'text-gray-700 hover:bg-black/5'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    Registrarse
                  </button>
                </>
              )}

              {/* Pedir ahora */}
              <a
                href="#productos"
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold tracking-wide text-white transition-colors"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#631f2d')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Pedir ahora
              </a>
            </div>

            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors md:hidden ${
                isSolid
                  ? 'text-gray-700 hover:bg-black/5'
                  : 'text-white hover:bg-white/10'
              }`}
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
          <div className="border-t border-black/5 bg-[#F5EDD8] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-black/5 hover:text-[#7B2D3E]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#productos"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-white"
                style={{ backgroundColor: BRAND }}
              >
                Pedir ahora
              </a>
            </div>

            <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3 sm:hidden">
              {user ? (
                <>
                  <span className="px-3 text-sm font-medium text-gray-700">
                    Hola, {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className={`${navBtnClass} text-left text-gray-700 hover:bg-black/5 hover:text-[#7B2D3E]`}
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openModal('login')}
                    className={`${navBtnClass} text-left text-gray-700 hover:bg-black/5 hover:text-[#7B2D3E]`}
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={() => openModal('register')}
                    className={`${navBtnClass} text-left text-gray-700 hover:bg-black/5 hover:text-[#7B2D3E]`}
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

      <CartDrawer />
    </>
  )
}
