export default function Productos() {
  return (
    <main
      id="inicio"
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-[url('/imagenes/torta2.jpeg')] bg-cover bg-[center_60%] blur-xs"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white">
        <h1>Productos</h1>
        <p>Acá se mostrarán nuestros panes, facturas y más.</p>
      </div>
    </main>
  );
}