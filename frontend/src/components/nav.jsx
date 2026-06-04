import { Link } from 'react-router-dom'

const navLinkClass =
  'rounded-lg px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-amber-100 hover:text-amber-900'

export default function Nav() {
  return (
    <nav className="flex items-center justify-center gap-2 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
      <Link to="/" className={navLinkClass}>
        Inicio
      </Link>
      <Link to="/productos" className={navLinkClass}>
        Productos
      </Link>
      <Link to="/reservas" className={navLinkClass}>
        Reservas
      </Link>
    </nav>
  )
}
