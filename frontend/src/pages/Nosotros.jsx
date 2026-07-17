export default function Nosotros() {
  return (
    <main
      id="nosotros"
      className="scroll-mt-16 sm:scroll-mt-20 relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
    >
      <div
        className="absolute inset-0 bg-[url('/imagenes/torta1.jpeg')] bg-cover bg-[center_40%] blur-xs"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl text-center text-white">
        <h1 className="text-3xl font-semibold tracking-tight drop-shadow-sm sm:text-4xl md:text-5xl">
          Nosotros
        </h1>
        <p className="mt-3 text-base text-white/95 sm:mt-4 sm:text-lg md:text-xl">
          Somos una pastelería con historia y un gran recorrido.
        </p>
      </div>
    </main>
  )
}
