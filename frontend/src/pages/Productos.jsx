import { useState } from "react"
import ProductCard from "../components/ProductCard"
import { useCart } from "../components/CartContext"

/* ------------------------------------------------------------------ */
/* Datos de los productos                                             */
/* (más adelante esto puede venir de una API o un archivo separado)   */
/* ------------------------------------------------------------------ */

const PRODUCTOS = [
  {
    id: 1,
    categoria: "panes",
    image: "/imagenes/pan.jpg",
    badge: "MÁS VENDIDO",
    title: "Pan de Campo",
    description: "Masa madre de fermentación lenta, corteza crocante y miga alveolada.",
    price: 2800,
  },
  {
    id: 2,
    categoria: "panes",
    image: "/imagenes/pan.jpg",
    badge: null,
    title: "Pan Integral de Semillas",
    description: "Harina integral, mix de semillas de girasol, chía y sésamo.",
    price: 3000,
  },
  {
    id: 3,
    categoria: "facturas",
    image: "/imagenes/torta1.jpeg",
    badge: "FAVORITO",
    title: "Medialunas de Manteca",
    description: "Docena de medialunas artesanales recién horneadas.",
    price: 2200,
  },
  {
    id: 4,
    categoria: "facturas",
    image: "/imagenes/torta2.jpeg",
    badge: null,
    title: "Facturas Mixtas",
    description: "Docena surtida: vigilantes, cañoncitos y sacramentos.",
    price: 2400,
  },
  {
    id: 5,
    categoria: "tortas",
    image: "/imagenes/torta3.jpeg",
    badge: "MÁS VENDIDA",
    title: "Torta de Chocolate Belga",
    description: "Mousse de chocolate 70% cacao, ganache artesanal y crocante de almendras.",
    price: 4800,
  },
]

const CATEGORIAS = [
  { id: "panes", label: "Panes" },
  { id: "facturas", label: "Facturas" },
  { id: "tortas", label: "Tortas" },
]

export default function Productos() {
  const [categoria, setCategoria] = useState("panes")
  const { addItem, setIsOpen } = useCart()

  const productosFiltrados = PRODUCTOS.filter((p) => p.categoria === categoria)

  const handleOrder = (producto) => {
    addItem(producto)
    setIsOpen(true) // abre el panel del carrito para dar feedback inmediato
  }

  return (
    <>
      {/* Catálogo */}
      <section id="productos" className="w-full px-4 py-16 sm:px-6 sm:py-20" style={{ background: '#F5EDD8' }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">Nuestros productos</h2>
          </div>
          {/* Tabs de categoría */}
          <nav className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  categoria === cat.id
                    ? "bg-amber-800 text-white"
                    : "bg-white text-neutral-600 ring-1 ring-black/10 hover:bg-neutral-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Grilla de productos */}
          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  image={producto.image}
                  badge={producto.badge}
                  title={producto.title}
                  description={producto.description}
                  price={producto.price}
                  onOrder={() => handleOrder(producto)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-500">
              Todavía no hay productos cargados en esta categoría.
            </p>
          )}
        </div>
      </section>
    </>
  )
}