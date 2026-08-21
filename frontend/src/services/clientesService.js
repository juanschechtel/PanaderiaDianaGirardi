const SIMULATED_DELAY_MS = 400
const delay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), SIMULATED_DELAY_MS))

const CLIENTES = [
  { id: 1, nombre: "Valentina Morán", email: "vale@gmail.com", pedidos: 4, totalGastado: 18600, ultimoPedido: "2025-05-21" },
  { id: 2, nombre: "Lucía Fernández", email: "lufer@hotmail.com", pedidos: 7, totalGastado: 42300, ultimoPedido: "2025-05-20" },
  { id: 3, nombre: "Martín Romero", email: "mromero@outlook.com", pedidos: 2, totalGastado: 11600, ultimoPedido: "2025-05-19" },
  { id: 4, nombre: "Carolina Sánchez", email: "caro.s@gmail.com", pedidos: 5, totalGastado: 22800, ultimoPedido: "2025-05-18" },
  { id: 5, nombre: "Diego Alvarez", email: "dalvarez@empresa.com", pedidos: 12, totalGastado: 89400, ultimoPedido: "2025-05-17" },
  { id: 6, nombre: "Sofía Reyes", email: "sofi.r@gmail.com", pedidos: 1, totalGastado: 5340, ultimoPedido: "2025-05-22" },
  { id: 7, nombre: "Andrés Castro", email: "acastro@gmail.com", pedidos: 3, totalGastado: 14700, ultimoPedido: "2025-05-15" },
  { id: 8, nombre: "Paula Méndez", email: "paula.m@yahoo.com", pedidos: 8, totalGastado: 52100, ultimoPedido: "2025-05-10" },
]

/**
 * Futuro endpoint real: GET /api/clientes
 */
export async function getClientes() {
  // TODO backend: reemplazar por
  // const res = await fetch(`${API_BASE_URL}/clientes`)
  // return res.json()
  return delay([...CLIENTES])
}