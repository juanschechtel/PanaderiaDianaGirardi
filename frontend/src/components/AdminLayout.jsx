import { useEffect, useState } from "react"
import AdminSidebar from "./AdminSidebar"
import { getStockBajo } from "../services/dashboardService"

export default function AdminLayout({ breadcrumb, children }) {
  const [stockBajoCount, setStockBajoCount] = useState(0)

  useEffect(() => {
    let cancelado = false
    getStockBajo().then((data) => {
      if (!cancelado) setStockBajoCount(data.length)
    })
    return () => {
      cancelado = true
    }
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto bg-[#F3ECD9]">
        {/* Barra superior: breadcrumb + aviso de stock bajo (persistente en todas las pantallas) */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-[#F3ECD9]/95 px-8 py-3 backdrop-blur">
          <span className="text-xs font-semibold tracking-widest text-amber-700/70">
            {breadcrumb}
          </span>
          {stockBajoCount > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
              <IconAlert className="h-3.5 w-3.5" />
              {stockBajoCount} con stock bajo
            </span>
          )}
        </div>

        <div className="px-8 py-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  )
}

function IconAlert(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}