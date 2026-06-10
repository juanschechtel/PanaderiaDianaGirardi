import Login from "./login"
const navLinkClass =
  'rounded-lg px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-amber-100 hover:text-amber-900'



export default function Nav() {
  return (
    <nav className="flex items-center justify-center gap-2 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
      <a href="/Inicio" className={navLinkClass}>
        Inicio
      </a>
      <a href="/Productos" className={navLinkClass}>
        Productos
      </a>
      <a href="/Reservas" className={navLinkClass}>
        Reservas
      </a>
      <Login/>
    </nav>
  )
}
