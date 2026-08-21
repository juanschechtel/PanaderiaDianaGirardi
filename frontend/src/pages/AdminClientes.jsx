import { useEffect, useMemo, useState } from "react"
import AdminLayout from "../components/AdminLayout"
import { getClientes } from "../services/clientesService"

export default function AdminClientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState("")

  useEffect(() => {
    let cancelado = false
    setLoading(true)
    getClientes().then((data) => {
      if (!cancelado) {
        setClientes(data)
        setLoading(false)
      }
    })
    return () => {
      cancelado = true
    }
  }, [])

  const clientesFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return clientes
    return clientes.filter(
      (c) => c.nombre.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    )
  }, [clientes, busqueda])

  // Exportación real a CSV, funciona 100% en el front (no necesita backend)
  const handleExportarCSV = () => {
    const encabezado = ["Nombre", "Email", "Pedidos", "Total gastado", "Último pedido"]
    const filas = clientesFiltrados.map((c) => [
      c.nombre,
      c.email,
      c.pedidos,
      c.totalGastado,
      c.ultimoPedido,
    ])

    const csv = [encabezado, ...filas]
      .map((fila) => fila.map((valor) => `"${valor}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "clientes.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout breadcrumb="CLIENTES">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Clientes
        </h1>
        <button
          onClick={handleExportarCSV}
          className="flex items-center gap-2 rounded-lg border border-black/15 px-5 py-2.5 text-sm font-semibold tracking-wide text-neutral-800 transition-colors hover:bg-black/5"
        >
          <IconDownload className="h-4 w-4" />
          EXPORTAR CSV
        </button>
      </div>

      {/* Búsqueda */}
      <div className="relative mt-6 max-w-md">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-700/60" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar cliente..."
          className="w-full rounded-xl bg-[#FBF6E9] py-3 pl-11 pr-4 text-sm text-neutral-800 placeholder:text-neutral-400 ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        />
      </div>

      {/* Tabla */}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-[#FBF6E9] ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Pedidos</th>
              <th className="px-6 py-3">Total gastado</th>
              <th className="px-6 py-3">Último pedido</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-neutral-400">
                  Cargando clientes...
                </td>
              </tr>
            ) : clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-neutral-400">
                  No se encontraron clientes.
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((c, i) => (
                <tr key={c.id} className={i !== 0 ? "border-t border-black/5" : ""}>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-800/10 text-xs font-semibold text-amber-800">
                        {c.nombre.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-neutral-900">{c.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-neutral-600">{c.email}</td>
                  <td className="px-6 py-3 text-neutral-700">{c.pedidos}</td>
                  <td className="px-6 py-3 text-neutral-900">
                    ${c.totalGastado.toLocaleString("es-AR")}
                  </td>
                  <td className="px-6 py-3 text-neutral-500">{c.ultimoPedido}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && (
        <p className="mt-4 text-sm text-neutral-500">
          {clientesFiltrados.length} cliente{clientesFiltrados.length !== 1 ? "s" : ""} registrado
          {clientesFiltrados.length !== 1 ? "s" : ""}
        </p>
      )}
    </AdminLayout>
  )
}

/* --- Íconos inline --- */

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function IconDownload(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
}