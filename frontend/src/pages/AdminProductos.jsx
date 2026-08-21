import { useEffect, useMemo, useState } from "react"
import AdminLayout from "../components/AdminLayout"
import ProductoFormModal from "../components/ProductoFormModal"
import {
  getProductosAdmin,
  deleteProductoAdmin,
  addProductoAdmin,
} from "../services/productosAdminService"

function stockBadgeClass(stock) {
  if (stock <= 3) return "bg-amber-100 text-amber-800"
  if (stock < 10) return "bg-blue-100 text-blue-700"
  return "bg-emerald-100 text-emerald-700"
}

export default function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [busqueda, setBusqueda] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)

  useEffect(() => {
    let cancelado = false
    setLoading(true)
    setError("")
    getProductosAdmin()
      .then((data) => {
        if (!cancelado) {
          setProductos(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err.message || "No se pudieron cargar los productos.")
          setProductos([])
          setLoading(false)
        }
      })
    return () => {
      cancelado = true
    }
  }, [])

  const productosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return productos
    return productos.filter((p) => p.nombre.toLowerCase().includes(q))
  }, [productos, busqueda])

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return
    try {
      await deleteProductoAdmin(id)
      setProductos((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      window.alert(err.message)
    }
  }

  const handleAgregar = () => setModalAbierto(true)

  const handleSubmitNuevoProducto = async (datosProducto) => {
    try {
      const nuevo = await addProductoAdmin(datosProducto)
      setProductos((prev) => [nuevo, ...prev])
      setModalAbierto(false)
    } catch (err) {
      window.alert(err.message || "No se pudo crear el producto.")
      throw err
    }
  }

  const handleEditar = (nombre) => {
    // Placeholder: acá iría un modal/formulario de edición.
    window.alert(`Editar "${nombre}" — pendiente de implementar.`)
  }

  return (
    <AdminLayout breadcrumb="PRODUCTOS">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Productos
        </h1>
        <button
          onClick={handleAgregar}
          className="flex items-center gap-2 rounded-lg bg-[#7B2D3E] px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#631f2d]"
        >
          <IconPlus className="h-4 w-4" />
          AGREGAR PRODUCTO
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      )}

      {/* Búsqueda */}
      <div className="relative mt-6 max-w-md">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-700/60" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full rounded-xl bg-[#FBF6E9] py-3 pl-11 pr-4 text-sm text-neutral-800 placeholder:text-neutral-400 ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        />
      </div>

      {/* Tabla */}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-[#FBF6E9] ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Categoría</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Etiqueta</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-neutral-400">
                  Cargando productos...
                </td>
              </tr>
            ) : productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-neutral-400">
                  No se encontraron productos.
                </td>
              </tr>
            ) : (
              productosFiltrados.map((p, i) => (
                <tr key={p.id} className={i !== 0 ? "border-t border-black/5" : ""}>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.nombre}
                        className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      />
                      <span className="font-medium text-neutral-900">{p.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-neutral-600">{p.categoria}</td>
                  <td className="px-6 py-3 text-neutral-900">
                    ${p.precio.toLocaleString("es-AR")}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${stockBadgeClass(p.stock)}`}>
                      {p.stock} ud.
                    </span>
                  </td>
                  <td className="px-6 py-3 text-neutral-500">
                    {p.etiqueta || "—"}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditar(p.nombre)}
                        aria-label={`Editar ${p.nombre}`}
                        className="text-neutral-500 hover:text-neutral-800"
                      >
                        <IconPencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.nombre)}
                        aria-label={`Eliminar ${p.nombre}`}
                        className="text-[#B3392F] hover:text-[#8f2d25]"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductoFormModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleSubmitNuevoProducto}
      />
    </AdminLayout>
  )
}

/* --- Íconos inline --- */

function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function IconPencil(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}

function IconTrash(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  )
}