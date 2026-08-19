import { useCart } from "./CartContext"

export default function CartDrawer({ onCheckout }) {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCart()

  const handleCheckout = () => {
    setIsOpen(false)
    onCheckout?.()
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Tu carrito
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
            className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-neutral-500">
              Todavía no agregaste productos.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-neutral-900">
                      {item.title}
                    </span>
                    <span className="text-sm text-neutral-500">
                      ${item.price.toLocaleString("es-AR")}
                    </span>

                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cantidad - 1)
                        }
                        className="h-6 w-6 rounded-full border border-neutral-300 text-sm text-neutral-600 hover:bg-neutral-100"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.cantidad + 1)
                        }
                        className="h-6 w-6 rounded-full border border-neutral-300 text-sm text-neutral-600 hover:bg-neutral-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Quitar ${item.title}`}
                    className="self-start text-neutral-400 hover:text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      className="h-4 w-4"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-base font-semibold text-neutral-900">
              <span>Total</span>
              <span>${totalPrice.toLocaleString("es-AR")}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-full bg-amber-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-900"
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </aside>
    </>
  )
}