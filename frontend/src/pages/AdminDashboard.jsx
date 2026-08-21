import { useEffect, useState } from "react"
import AdminLayout from "../components/AdminLayout"
import { getMetrics, getUltimosPedidos, getStockBajo } from "../services/dashboardService"

const ESTADO_STYLES = {
  Pendiente: "bg-amber-100 text-amber-800",
  "En preparación": "bg-blue-100 text-blue-700",
  Enviado: "bg-emerald-100 text-emerald-700",
  Entregado: "bg-neutral-100 text-neutral-600",
}

const getStoredUser = () => {
  const storedUser = localStorage.getItem("usuario")
  if (!storedUser) return null
  try {
    return JSON.parse(storedUser)
  } catch {
    return null
  }
}

export default function AdminDashboard() {
  const [user] = useState(getStoredUser)
  const userName =
    user?.first_name || user?.nombre || user?.username || user?.email || "administrador"

  const [metrics, setMetrics] = useState(null)
  const [pedidos, setPedidos] = useState([])
  const [stockBajo, setStockBajo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelado = false

    async function cargarDashboard() {
      setLoading(true)
      setError(null)
      try {
        const [metricsData, pedidosData, stockData] = await Promise.all([
          getMetrics(),
          getUltimosPedidos(),
          getStockBajo(),
        ])
        if (cancelado) return
        setMetrics(metricsData)
        setPedidos(pedidosData)
        setStockBajo(stockData)
      } catch (err) {
        if (!cancelado) setError("No se pudo cargar la información del dashboard.")
      } finally {
        if (!cancelado) setLoading(false)
      }
    }

    cargarDashboard()
    return () => {
      cancelado = true
    }
  }, [])

  return (
    <AdminLayout breadcrumb="INICIO">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
        Buen día, {userName}
      </h1>
      <p className="mt-1 text-neutral-600">
        Aquí está el resumen de tu negocio.
      </p>

      {error && (
        <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      )}

      {/* Tarjetas de métricas */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading || !metrics ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
            <MetricCard
              icon={<IconDollar className="h-5 w-5" />}
              badge={metrics.ventasVariacion}
              badgeTone="positive"
              value={`$${metrics.ventasConfirmadas.toLocaleString("es-AR")}`}
              label="Ventas confirmadas"
            />
            <MetricCard
              icon={<IconCart className="h-5 w-5" />}
              value={metrics.pedidosActivos}
              label="Pedidos activos"
            />
            <MetricCard
              icon={<IconUsers className="h-5 w-5" />}
              badge={metrics.clientesVariacion}
              badgeTone="positive"
              value={metrics.clientesRegistrados}
              label="Clientes registrados"
            />
            <MetricCard
              icon={<IconBox className="h-5 w-5" />}
              value={metrics.productosEnCatalogo}
              label="Productos en catálogo"
            />
          </>
        )}
      </div>

      {/* Últimos pedidos */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
            Últimos pedidos
          </h2>
          <button className="text-sm font-medium text-amber-800 underline decoration-amber-800/40 underline-offset-4 hover:text-amber-900">
            Ver todos
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-[#FBF6E9] ring-1 ring-black/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Producto</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-400">
                    Cargando pedidos...
                  </td>
                </tr>
              ) : pedidos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-400">
                    Todavía no hay pedidos.
                  </td>
                </tr>
              ) : (
                pedidos.map((pedido, i) => (
                  <tr key={pedido.id} className={i !== 0 ? "border-t border-black/5" : ""}>
                    <td className="px-6 py-4 font-medium text-neutral-900">
                      {pedido.cliente}
                    </td>
                    <td className="px-6 py-4 text-neutral-700">
                      {pedido.producto}
                    </td>
                    <td className="px-6 py-4 text-neutral-900">
                      ${pedido.total.toLocaleString("es-AR")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${ESTADO_STYLES[pedido.estado]}`}
                      >
                        {pedido.estado}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerta de stock bajo */}
      {!loading && stockBajo.length > 0 && (
        <div className="mt-8 rounded-2xl bg-amber-50 px-6 py-5 ring-1 ring-amber-200">
          <div className="flex items-center gap-2 text-amber-900">
            <IconAlert className="h-4 w-4" />
            <span className="text-sm font-medium">
              Productos con stock bajo (≤ 3 unidades):
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {stockBajo.map((p) => (
              <span
                key={p.nombre}
                className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm text-amber-900"
              >
                {p.nombre} — {p.unidades} ud.
              </span>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

/* --- Subcomponentes --- */

function MetricCard({ icon, value, label, badge, badgeTone }) {
  return (
    <div className="rounded-2xl bg-[#FBF6E9] p-5 ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-800/10 text-amber-800">
          {icon}
        </div>
        {badge && (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              badgeTone === "positive" ? "text-emerald-600" : "text-neutral-500"
            }`}
          >
            {badgeTone === "positive" && <IconArrowUp className="h-3 w-3" />}
            {badge}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-neutral-900">{value}</p>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </p>
    </div>
  )
}

function MetricCardSkeleton() {
  return (
    <div className="rounded-2xl bg-[#FBF6E9] p-5 ring-1 ring-black/5">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-black/5" />
      <div className="mt-4 h-7 w-20 animate-pulse rounded bg-black/5" />
      <div className="mt-2 h-3 w-28 animate-pulse rounded bg-black/5" />
    </div>
  )
}

/* --- Íconos inline --- */

function IconDollar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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

function IconBox(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  )
}

function IconArrowUp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
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