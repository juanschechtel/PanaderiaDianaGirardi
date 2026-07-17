export default function Home() {
  return (
    <main
      id="inicio"
      className="scroll-mt-16 sm:scroll-mt-20 relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[url('https://media.scoolinary.app/blog/images/2023/11/vista-de-croissant-gourmet-recien-horneados.jpg')] bg-cover bg-center px-4 py-24 sm:px-6"
    >
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <div className="relative z-10 max-w-2xl text-center text-white">
        <h1 className="text-3xl font-semibold tracking-tight drop-shadow-sm sm:text-4xl md:text-5xl">
          Panadería Diana Girardi
        </h1>
        <p className="mt-3 text-base text-white/95 sm:mt-4 sm:text-lg md:text-xl">
          Bienvenidos. Pan artesanal hecho con dedicación.
        </p>
      </div>
    </main>
  )
}
