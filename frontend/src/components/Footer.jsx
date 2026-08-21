const BRAND = '#7B2D3E'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B1210] px-4 py-14 text-stone-300 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {/* Marca */}
        <div>
          <h2 className="font-serif text-3xl font-semibold text-white">
            Diana Girardi
          </h2>
          <p className="mt-1 text-xs font-semibold tracking-[0.25em] text-amber-500/90">
            PANADERÍA ARTESANAL
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
            Pan artesanal, facturas y pedidos especiales, horneados con
            dedicación cada día.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-500/90">
            CONTACTO
          </p>
          <ul className="mt-5 flex flex-col gap-3.5">
            <li>
              <a
                href="https://wa.me/5492983418068"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-stone-300 transition-colors hover:text-white"
              >
                <IconPhone className="h-4 w-4 shrink-0 text-amber-500" />
                WhatsApp con Diana
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/diana_girardi"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-stone-300 transition-colors hover:text-white"
              >
                <IconInstagram className="h-4 w-4 shrink-0 text-amber-500" />
                @diana_girardi
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-stone-300">
              <IconPin className="h-4 w-4 shrink-0 text-amber-500" />
              Tres Arroyos, Buenos Aires
            </li>
          </ul>
        </div>

        {/* Horarios */}
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-500/90">
            HORARIOS
          </p>
          <ul className="mt-5 flex flex-col gap-3.5">
            <li className="flex items-center justify-between gap-4 text-sm">
              <span className="text-stone-300">Martes a Viernes</span>
              <span className="font-medium text-white">9:30 – 13:00</span>
              <span className="font-medium text-white">16:30 – 21:30</span>
            </li>
            <li className="flex items-center justify-between gap-4 text-sm">
              <span className="text-stone-300">Sábados</span>
              <span className="font-medium text-white">9:00 – 15:00</span>
            </li>
            <li className="flex items-center justify-between gap-4 text-sm">
              <span className="text-stone-300">Domingos</span>
              <span className="font-medium text-stone-400">Cerrado</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-stone-500">
            * Pedidos con 48 hs de anticipación mínima.
          </p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Panadería Diana Girardi. Todos los derechos reservados.</span>
        <span className="flex items-center gap-1.5">
          Hecho con
          <span style={{ color: BRAND }}>♥</span>
          en Buenos Aires
        </span>
      </div>
    </footer>
  )
}

/* --- Íconos inline --- */

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}