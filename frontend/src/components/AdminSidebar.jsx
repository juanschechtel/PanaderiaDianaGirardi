import { useState } from "react"
import { NavLink } from "react-router-dom"

const getStoredUser = () => {
  const storedUser = localStorage.getItem("usuario")
  if (!storedUser) return null
  try {
    return JSON.parse(storedUser)
  } catch {
    return null
  }
}

const NAV_ITEMS = [
  { to: "/admin", label: "Inicio", icon: IconGrid, end: true },
  { to: "/admin/productos", label: "Productos", icon: IconBox },
  { to: "/admin/pedidos", label: "Pedidos", icon: IconCart },
  { to: "/admin/clientes", label: "Clientes", icon: IconUsers },
]

export default function AdminSidebar() {
  const [user] = useState(getStoredUser)
  const userName =
    user?.first_name || user?.nombre || user?.username || user?.email || "Admin"
  const userEmail = user?.email || ""
  const initial = userName.charAt(0).toUpperCase()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    window.location.href = "/"
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col justify-between bg-[#1B120C] px-5 py-6 text-stone-300">
      <div>
        {/* Logo */}
        <div className="border-b border-white/10 pb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Girardi
          </h1>
          <p className="mt-0.5 text-[11px] font-medium tracking-widest text-amber-600/80">
            PATISSERIE · ADMIN
          </p>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-900/30 text-amber-500"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Usuario + logout */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-800 text-sm font-semibold text-white">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {userName}
            </p>
            <p className="truncate text-xs text-stone-400">{userEmail}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-300 hover:bg-white/5 hover:text-white"
        >
          <IconLogout className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

/* --- Íconos inline --- */

function IconGrid(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function IconBox(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  )
}

function IconCart(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconLogout(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}