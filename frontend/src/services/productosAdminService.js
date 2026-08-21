const API_BASE_URL = "http://localhost:3000"

export const CATEGORIAS_ADMIN = ["Postres", "Desayunos"]

function authHeaders() {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function parseError(res) {
  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || data.error || `Error ${res.status}`)
}

function mapProductoFromApi(p) {
  return {
    id: p.id ?? p.id_product ?? p.productId,
    nombre: p.name ?? p.nombre ?? "",
    categoria: p.category ?? p.categoria ?? "",
    precio: Number(p.price ?? p.precio ?? 0),
    stock: Number(p.stock ?? 0),
    image: p.img ?? p.image ?? "",
    descripcion: p.description ?? p.descripcion ?? "",
    etiqueta: p.etiqueta ?? null,
  }
}

function mapProductoToApi(producto) {
  return {
    name: producto.nombre,
    category: producto.categoria,
    price: Number(producto.precio),
    stock: Number(producto.stock),
    img: producto.image || null,
    description: producto.descripcion || null,
  }
}

/** GET /dashbonard/products (ruta actual del backend) */
export async function getProductosAdmin() {
  const res = await fetch(`${API_BASE_URL}/dashbonard/products`, {
    headers: authHeaders(),
  })
  if (!res.ok) await parseError(res)
  const data = await res.json()
  const lista = Array.isArray(data) ? data : data.products ?? data.productos ?? []
  return lista.map(mapProductoFromApi)
}

/** POST /dashboard/products */
export async function addProductoAdmin(producto) {
  const res = await fetch(`${API_BASE_URL}/dashboard/products`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(mapProductoToApi(producto)),
  })
  if (!res.ok) await parseError(res)
  const data = await res.json()
  return mapProductoFromApi({
    ...mapProductoToApi(producto),
    id: data.productId,
    etiqueta: producto.etiqueta ?? null,
  })
}

/** PUT /dashboard/products/:id */
export async function updateProductoAdmin(id, producto) {
  const res = await fetch(`${API_BASE_URL}/dashboard/products/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(mapProductoToApi(producto)),
  })
  if (!res.ok) await parseError(res)
  return mapProductoFromApi({
    ...mapProductoToApi(producto),
    id,
    etiqueta: producto.etiqueta ?? null,
  })
}

export async function deleteProductoAdmin() {
  throw new Error("El backend todavía no tiene endpoint para eliminar productos.")
}
