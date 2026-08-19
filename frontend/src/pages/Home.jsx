export default function Home() {
  return (
    <main
      id="inicio"
      className="scroll-mt-16 sm:scroll-mt-20 relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[url('https://media.scoolinary.app/blog/images/2023/11/vista-de-croissant-gourmet-recien-horneados.jpg')] bg-cover bg-center px-4 py-24 sm:px-6"
    >
      {/* Degradado: oscuro arriba (donde vive el nav transparente) → crema abajo,
          para que la sección se funda con el fondo de Productos (#F5EDD8) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0B1420]/90 via-[#0B1420]/70 to-[#F5EDD8]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1fr_auto]">
        {/* Texto principal */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-amber-300/90">
            ARTESANAL
          </p>

          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            Diana Girardi Patisserie
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/90 sm:mt-5 sm:text-lg md:text-xl">
            Bienvenidos. Pan artesanal hecho con dedicación.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <a
              href="#productos"
              className="flex items-center gap-2 rounded-lg bg-[#7B2D3E] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#631f2d]"
            >
              Ver productos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
            <a
              href="#reservas"
              className="flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Reservas
            </a>
          </div>
        </div>

        {/* Tarjeta de testimonio — placeholder, reemplazar por una cita real o quitar */}
        <div className="hidden max-w-sm rounded-2xl bg-[#1B1210]/90 p-6 text-white backdrop-blur-sm lg:block">
          <p className="text-xs font-semibold tracking-widest text-amber-400/90">
            @DIANA_GIRARDI
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/90">
            "Como te ven te tratan."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7B2D3E] text-sm font-semibold">
              DG
            </div>
            <div className="text-sm">
              <p className="font-medium">Diana Girardi</p>
              <p className="text-white/60">Panadera & Fundadora</p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="h-10 w-px bg-white/40" aria-hidden="true" />
        <span className="text-[10px] font-semibold tracking-[0.3em] text-white/70">
          SCROLL
        </span>
      </div>
    </main>
  )
}