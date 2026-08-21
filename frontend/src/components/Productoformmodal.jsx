import { useEffect, useRef, useState } from "react"
import { CATEGORIAS_ADMIN } from "../services/productosAdminService"

const initialForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  categoria: CATEGORIAS_ADMIN[0],
  etiqueta: "",
}

export default function ProductoFormModal({ isOpen, onClose, onSubmit, producto = null }) {
  const esEdicion = Boolean(producto)

  const [modoImagen, setModoImagen] = useState("archivo") // "archivo" | "url"
  const [imagenPreview, setImagenPreview] = useState(null)
  const [imagenUrl, setImagenUrl] = useState("")
  const [form, setForm] = useState(initialForm)
  const [enviando, setEnviando] = useState(false)
  const fileInputRef = useRef(null)

  // Precarga el formulario con los datos del producto cuando se abre en modo edición
  useEffect(() => {
    if (!isOpen) return

    if (producto) {
      setForm({
        nombre: producto.nombre ?? "",
        descripcion: producto.descripcion ?? "",
        precio: producto.precio ?? "",
        stock: producto.stock ?? "",
        categoria: producto.categoria ?? CATEGORIAS_ADMIN[0],
        etiqueta: producto.etiqueta ?? "",
      })

      const esUrl = typeof producto.image === "string" && /^https?:\/\//.test(producto.image)
      setModoImagen(esUrl ? "url" : "archivo")
      setImagenUrl(esUrl ? producto.image : "")
      setImagenPreview(esUrl ? null : producto.image ?? null)
    } else {
      setForm(initialForm)
      setImagenPreview(null)
      setImagenUrl("")
      setModoImagen("archivo")
    }
  }, [isOpen, producto])

  if (!isOpen) return null

  const resetForm = () => {
    setForm(initialForm)
    setImagenPreview(null)
    setImagenUrl("")
    setModoImagen("archivo")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImagenPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleField = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const imagenFinal = modoImagen === "archivo" ? imagenPreview : imagenUrl.trim()

    if (!form.nombre.trim()) {
      window.alert("Poné un nombre para el producto.")
      return
    }
    if (!imagenFinal) {
      window.alert("Subí una imagen o pegá una URL.")
      return
    }

    setEnviando(true)
    try {
      await onSubmit({
        image: imagenFinal,
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio) || 0,
        stock: Number(form.stock) || 0,
        categoria: form.categoria,
        etiqueta: form.etiqueta.trim() || null,
      })
      resetForm()
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#FBF6E9] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="font-serif text-2xl text-neutral-900">
            {esEdicion ? "Editar producto" : "Agregar producto"}
          </h2>
          <button
            onClick={handleClose}
            aria-label="Cerrar"
            className="text-neutral-500 hover:text-neutral-800"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
          {/* Imagen */}
          <div>
            <label className="text-xs font-semibold tracking-widest text-neutral-500">
              IMAGEN
            </label>

            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setModoImagen("archivo")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  modoImagen === "archivo"
                    ? "bg-[#7B2D3E] text-white"
                    : "border border-black/15 text-neutral-600 hover:bg-black/5"
                }`}
              >
                Subir archivo
              </button>
              <button
                type="button"
                onClick={() => setModoImagen("url")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  modoImagen === "url"
                    ? "bg-[#7B2D3E] text-white"
                    : "border border-black/15 text-neutral-600 hover:bg-black/5"
                }`}
              >
                URL
              </button>
            </div>

            {modoImagen === "archivo" ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 py-10 text-center transition-colors hover:border-amber-700/50 hover:bg-black/[0.02]"
              >
                {imagenPreview ? (
                  <img
                    src={imagenPreview}
                    alt="Vista previa"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <IconUpload className="h-6 w-6 text-amber-700" />
                    <span className="text-sm text-neutral-700">Hacé clic para subir</span>
                    <span className="text-xs font-medium text-amber-700/80">
                      JPG, PNG, WEBP
                    </span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </button>
            ) : (
              <input
                type="url"
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                placeholder="https://..."
                className="mt-3 w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="text-xs font-semibold tracking-widest text-neutral-500">
              NOMBRE DEL PRODUCTO
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={handleField("nombre")}
              placeholder="Ej: Torta de Chocolate Belga"
              className="mt-2 w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-xs font-semibold tracking-widest text-neutral-500">
              DESCRIPCIÓN
            </label>
            <textarea
              value={form.descripcion}
              onChange={handleField("descripcion")}
              placeholder="Descripción breve del producto..."
              rows={3}
              className="mt-2 w-full resize-none rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            />
          </div>

          {/* Precio + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold tracking-widest text-neutral-500">
                PRECIO ($)
              </label>
              <input
                type="number"
                min="0"
                value={form.precio}
                onChange={handleField("precio")}
                placeholder="0"
                className="mt-2 w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-neutral-500">
                STOCK DISPONIBLE
              </label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={handleField("stock")}
                placeholder="0"
                className="mt-2 w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            </div>
          </div>

          {/* Categoría + Etiqueta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold tracking-widest text-neutral-500">
                CATEGORÍA
              </label>
              <select
                value={form.categoria}
                onChange={handleField("categoria")}
                className="mt-2 w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              >
                {CATEGORIAS_ADMIN.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-neutral-500">
                ETIQUETA (OPCIONAL)
              </label>
              <input
                type="text"
                value={form.etiqueta}
                onChange={handleField("etiqueta")}
                placeholder="Ej: Sin TACC, Favorito..."
                className="mt-2 w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-2 flex gap-3 border-t border-black/10 pt-5">
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 rounded-lg bg-[#7B2D3E] py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#631f2d] disabled:opacity-60"
            >
              {enviando
                ? esEdicion
                  ? "Guardando..."
                  : "Agregando..."
                : esEdicion
                ? "GUARDAR CAMBIOS"
                : "AGREGAR PRODUCTO"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-black/15 px-6 py-3 text-sm font-semibold tracking-wide text-neutral-700 transition-colors hover:bg-black/5"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* --- Íconos inline --- */

function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function IconUpload(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 21h14" />
    </svg>
  )
}