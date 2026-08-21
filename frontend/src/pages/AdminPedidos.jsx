import { useEffect, useMemo, useState } from "react"
import AdminLayout from "../components/AdminLayout"
import { getPedidos, avanzarEstadoPedido, ESTADOS_ORDEN } from "../services/pedidosService"

const ESTADO_STYLES = {
  Pendiente: "bg-amber-100 text-amber-800",
  "En preparación": "bg-blue-100 text-blue-700",
  Enviado: "bg-emerald-100 text-emerald-700",
  Entregado: "bg-neutral-100 text-neutral-600",
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("Todos")

  useEffect(() => {
    let cancelado = false
    setLoading(true)
    getPedidos().then((data) => {
      if (!cancelado) {
        setPedidos(data)
        setLoading(false)
      }
    })
    return () => {
      cancelado = true
    }
  }, [])

  const conteos = useMemo(() => {
    const base = Object.fromEntries(ESTADOS_ORDEN.map((e) => [e, 0]))
    pedidos.forEach((p) => {
      base[p.estado] = (base[p.estado] || 0) + 1
    })
    return base
  }, [pedidos])

  const pedidosFiltrados =
    filtro === "Todos" ? pedidos : pedidos.filter((p) => p.estado === filtro)

  const handleAvanzar = async (id) => {
    const actualizado = await avanzarEstadoPedido(id)
    if (!actualizado) return
    setPedidos((prev) => prev.map((p) => (p.id === id ? actualizado : p)))
  }

  return (
    <AdminLayout breadcrumb="PEDIDOS">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
        Pedidos
      </h1>

      {/* Tabs de filtro */}
      <div className="mt-6 flex flex-wrap gap-2">
        <FiltroTab
          label="Todos"
          count={pedidos.length}
          active={filtro === "Todos"}
          onClick={() => setFiltro("Todos")}
        />
        {ESTADOS_ORDEN.map((estado) => (
          <FiltroTab
            key={estado}
            label={estado}
            count={conteos[estado]}
            active={filtro === estado}
            onClick={() => setFiltro(estado)}
          />
        ))}
      </div>

      {/* Tabla */}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-[#FBF6E9] ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Mail</th>
              <th className="px-4 py-3">Dirección</th>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Cant.</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-neutral-400">
                  Cargando pedidos...
                </td>
              </tr>
            ) : pedidosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-neutral-400">
                  No hay pedidos en este estado.
                </td>
              </tr>
            ) : (
              pedidosFiltrados.map((p, i) => {
                const idxActual = ESTADOS_ORDEN.indexOf(p.estado)
                const siguiente = ESTADOS_ORDEN[idxActual + 1]
                return (
                  <tr key={p.id} className={i !== 0 ? "border-t border-black/5" : ""}>
                    <td className="px-4 py-3 text-neutral-400">#{p.id}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900">{p.cliente}</td>
                    <td className="px-4 py-3 text-neutral-500">{p.mail}</td>
                    <td className="max-w-[10rem] truncate px-4 py-3 text-neutral-500" title={p.direccion}>
                      {p.direccion}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{p.producto}</td>
                    <td className="px-4 py-3 text-neutral-700">{p.cantidad}</td>
                    <td className="px-4 py-3 text-neutral-900">
                      ${p.total.toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${ESTADO_STYLES[p.estado]}`}>
                        {p.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {siguiente ? (
                        <button
                          onClick={() => handleAvanzar(p.id)}
                          className="whitespace-nowrap rounded-lg bg-[#7B2D3E] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#631f2d]"
                        >
                          {siguiente}
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-emerald-600">
                          <IconCheck className="h-3.5 w-3.5" />
                          Finalizado
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

function FiltroTab({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-[#7B2D3E] text-white"
          : "bg-[#FBF6E9] text-neutral-600 ring-1 ring-black/10 hover:bg-black/5"
      }`}
    >
      {label} {count > 0 && <span className="opacity-70">({count})</span>}
    </button>
  )
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  )
}