import { PRODUCTOS } from "../data/productos"

/* ------------------------------------------------------------------ */
/* dashboardService                                                    */
/*                                                                      */
/* Cada función de acá abajo representa un endpoint que el backend      */
/* va a exponer en el futuro. Por ahora devuelven datos mock, pero      */
/* con la MISMA forma (shape) que se espera de la API real, envueltos   */
/* en una Promise con un delay simulado.                                */
/*                                                                      */
/* Cuando el backend esté listo, el ÚNICO lugar que hay que tocar es    */
/* el cuerpo de estas funciones — reemplazar el mock por un fetch real. */
/* Ningún componente que las consume necesita cambiar.                  */
/* ------------------------------------------------------------------ */

const SIMULATED_DELAY_MS = 400

const delay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), SIMULATED_DELAY_MS))

/**
 * Métricas generales del negocio.
 * Futuro endpoint real: GET /api/dashboard/metrics
 */
export async function getMetrics() {
  // TODO backend: reemplazar por
  // const res = await fetch(`${API_BASE_URL}/dashboard/metrics`)
  // if (!res.ok) throw new Error("Error al obtener métricas")
  // return res.json()

  return delay({
    ventasConfirmadas: 31400,
    ventasVariacion: "+12%",
    pedidosActivos: 3,
    clientesRegistrados: 8,
    clientesVariacion: "+3 este mes",
    productosEnCatalogo: PRODUCTOS.length, // este dato SÍ es real, no mock
  })
}

/**
 * Últimos pedidos recibidos.
 * Futuro endpoint real: GET /api/dashboard/pedidos?limit=5
 */
export async function getUltimosPedidos() {
  // TODO backend: reemplazar por
  // const res = await fetch(`${API_BASE_URL}/dashboard/pedidos?limit=5`)
  // if (!res.ok) throw new Error("Error al obtener pedidos")
  // return res.json()

  return delay([
    { id: 1, cliente: "Valentina Morán", producto: "Torta de Chocolate Belga", total: 4800, estado: "Pendiente" },
    { id: 2, cliente: "Lucía Fernández", producto: "Caja Girardi Clásica", total: 10800, estado: "En preparación" },
    { id: 3, cliente: "Martín Romero", producto: "Selección de Macarons", total: 8700, estado: "Enviado" },
    { id: 4, cliente: "Carolina Sánchez", producto: "Cheesecake de Frutos Rojos", total: 4200, estado: "Entregado" },
    { id: 5, cliente: "Diego Alvarez", producto: "Caja Croissant Premium", total: 27200, estado: "Entregado" },
  ])
}

/**
 * Productos con pocas unidades en stock.
 * Futuro endpoint real: GET /api/productos?stock_lte=3
 */
export async function getStockBajo() {
  // TODO backend: reemplazar por
  // const res = await fetch(`${API_BASE_URL}/productos?stock_lte=3`)
  // if (!res.ok) throw new Error("Error al obtener stock bajo")
  // return res.json()

  return delay([
    { nombre: "Cheesecake de Frutos Rojos", unidades: 3 },
    { nombre: "Caja Cumpleaños", unidades: 2 },
  ])
}