import { useCart } from "./CartContext"

export default function CartButton() {
  const { totalItems, setIsOpen } = useCart()

  return (
    <button
      onClick={() => setIsOpen(true)}
      aria-label="Abrir carrito"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-6 w-6"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-800 px-1 text-[11px] font-semibold text-white">
          {totalItems}
        </span>
      )}
    </button>
  )
}