/* ------------------------------------------------------------------ */
/* productosAdminService                                               */
/*                                                                      */
/* NOTA: esta lista es independiente de src/data/productos.js (la del  */
/* catálogo público). Cuando exista backend, ambas deberían venir del   */
/* mismo lugar (una tabla "productos" con categoría, precio y stock).   */
/* Por ahora es mock, con la forma que va a tener la respuesta real.    */
/* ------------------------------------------------------------------ */

const SIMULATED_DELAY_MS = 400
const delay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), SIMULATED_DELAY_MS))

export const CATEGORIAS_ADMIN = ["Postres", "Desayunos"]

let PRODUCTOS_ADMIN = [
  { id: 1, image: "/imagenes/torta3.jpeg", nombre: "Torta de Chocolate Belga", categoria: "Postres", precio: 4800, stock: 8, etiqueta: "Más vendida" },
  { id: 2, image: "/imagenes/torta1.jpeg", nombre: "Tarta de Frutas de Estación", categoria: "Postres", precio: 3600, stock: 5, etiqueta: null },
  { id: 3, image: "/imagenes/torta2.jpeg", nombre: "Selección de Macarons", categoria: "Postres", precio: 2900, stock: 15, etiqueta: "Favorito" },
  { id: 4, image: "/imagenes/torta1.jpeg", nombre: "Éclair de Praliné", categoria: "Postres", precio: 890, stock: 20, etiqueta: null },
  { id: 5, image: "/imagenes/torta3.jpeg", nombre: "Cheesecake de Frutos Rojos", categoria: "Postres", precio: 4200, stock: 3, etiqueta: "Sin TACC" },
  { id: 6, image: "/imagenes/torta2.jpeg", nombre: "Mille-Feuille de Vainilla", categoria: "Postres", precio: 1200, stock: 10, etiqueta: null },
  { id: 7, image: "/imagenes/pan.jpg", nombre: "Caja Girardi Clásica", categoria: "Desayunos", precio: 5400, stock: 12, etiqueta: "Para 2 personas" },
  { id: 8, image: "/imagenes/pan.jpg", nombre: "Caja Croissant Premium", categoria: "Desayunos", precio: 6800, stock: 8, etiqueta: "Especial" },
  { id: 9, image: "/imagenes/pan.jpg", nombre: "Desayuno Vegano", categoria: "Desayunos", precio: 4900, stock: 7, etiqueta: "Vegano" },
  { id: 10, image: "/imagenes/torta2.jpeg", nombre: "Brownie con Nuez", categoria: "Postres", precio: 1500, stock: 2, etiqueta: null },
]

/**
 * Futuro endpoint real: GET /api/productos
 */
export async function getProductosAdmin() {
  // TODO backend: reemplazar por
  // const res = await fetch(`${API_BASE_URL}/productos`)
  // return res.json()
  return delay([...PRODUCTOS_ADMIN])
}

/**
 * Futuro endpoint real: DELETE /api/productos/:id
 */
export async function deleteProductoAdmin(id) {
  // TODO backend: reemplazar por
  // await fetch(`${API_BASE_URL}/productos/${id}`, { method: "DELETE" })
  PRODUCTOS_ADMIN = PRODUCTOS_ADMIN.filter((p) => p.id !== id)
  return delay({ ok: true })
}

/**
 * Futuro endpoint real: POST /api/productos
 * (multipart/form-data si la imagen se sube como archivo, o JSON si es una URL)
 */
export async function addProductoAdmin(producto) {
  // TODO backend: reemplazar por
  // const formData = new FormData()
  // Object.entries(producto).forEach(([key, value]) => formData.append(key, value))
  // const res = await fetch(`${API_BASE_URL}/productos`, { method: "POST", body: formData })
  // return res.json()
  const nuevo = { id: Date.now(), ...producto }
  PRODUCTOS_ADMIN = [nuevo, ...PRODUCTOS_ADMIN]
  return delay(nuevo)
}
