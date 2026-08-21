const SIMULATED_DELAY_MS = 400
const delay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), SIMULATED_DELAY_MS))

export const ESTADOS_ORDEN = ["Pendiente", "En preparación", "Enviado", "Entregado"]

let PEDIDOS = [
  { id: 1, cliente: "Valentina Morán", mail: "vale@gmail.com", direccion: "Av. Santa Fe 1234, CABA", producto: "Torta de Chocolate Belga", cantidad: 1, total: 4800, estado: "Pendiente" },
  { id: 2, cliente: "Lucía Fernández", mail: "lufer@hotmail.com", direccion: "Corrientes 890, San Isidro", producto: "Caja Girardi Clásica", cantidad: 2, total: 10800, estado: "En preparación" },
  { id: 3, cliente: "Martín Romero", mail: "mromero@outlook.com", direccion: "Libertador 3456, Belgrano", producto: "Selección de Macarons", cantidad: 3, total: 8700, estado: "Enviado" },
  { id: 4, cliente: "Carolina Sánchez", mail: "caro.s@gmail.com", direccion: "9 de Julio 780, Microcentro", producto: "Cheesecake de Frutos Rojos", cantidad: 1, total: 4200, estado: "Entregado" },
  { id: 5, cliente: "Diego Alvarez", mail: "dalvarez@empresa.com", direccion: "Maipú 456, Retiro", producto: "Caja Croissant Premium", cantidad: 4, total: 27200, estado: "Entregado" },
  { id: 6, cliente: "Sofía Reyes", mail: "sofi.r@gmail.com", direccion: "Thames 234, Villa Crespo", producto: "Éclair de Praliné", cantidad: 6, total: 5340, estado: "Pendiente" },
]

/**
 * Futuro endpoint real: GET /api/pedidos
 */
export async function getPedidos() {
  // TODO backend: reemplazar por
  // const res = await fetch(`${API_BASE_URL}/pedidos`)
  // return res.json()
  return delay([...PEDIDOS])
}

/**
 * Avanza un pedido al siguiente estado del flujo (Pendiente → En preparación → Enviado → Entregado).
 * Futuro endpoint real: PATCH /api/pedidos/:id  { estado }
 */
export async function avanzarEstadoPedido(id) {
  const pedido = PEDIDOS.find((p) => p.id === id)
  if (!pedido) return delay(null)

  const idxActual = ESTADOS_ORDEN.indexOf(pedido.estado)
  const siguiente = ESTADOS_ORDEN[idxActual + 1]
  if (siguiente) {
    // TODO backend: reemplazar por
    // await fetch(`${API_BASE_URL}/pedidos/${id}`, { method: "PATCH", body: JSON.stringify({ estado: siguiente }) })
    pedido.estado = siguiente
  }
  return delay({ ...pedido })
}