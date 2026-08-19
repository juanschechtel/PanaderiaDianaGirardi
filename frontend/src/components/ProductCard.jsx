export default function ProductCard({
  image,
  badge,
  title,
  description,
  price,
  currency = "$",
  onOrder,
}) {
  const formattedPrice =
    typeof price === "number" ? price.toLocaleString("es-AR") : price

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
      {/* Imagen */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-800 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Contenido (panel beige) */}
      <div className="flex flex-1 flex-col p-5" style={{ background: '#F5EDD8' }}>
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
          {title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm text-neutral-600">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-neutral-900">
            {currency}
            {formattedPrice}
          </span>
          <button
            onClick={onOrder}
            className="rounded-full bg-rose-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-900"
          >
            Pedir
          </button>
        </div>
      </div>
    </div>
  )
}
