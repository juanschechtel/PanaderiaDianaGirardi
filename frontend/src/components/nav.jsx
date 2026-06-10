import { useState } from "react";
import Login from "./login";

const navLinkClass =
  "rounded-lg px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-amber-100 hover:text-amber-900";



export default function Nav() {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-center gap-2 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
        <a href="/Inicio" className={navLinkClass}>
          Inicio
        </a>

        <a href="/Productos" className={navLinkClass}>
          Productos
        </a>

        <a href="/Reservas" className={navLinkClass}>
          Reservas
        </a>

        <div className="flex gap-8">
          {/* BOTÓN DE LOGIN */}
          <button
            onClick={() => setMostrarLogin(true)}
            className="hover:text-amber-600 font-semibold text-gray-700 transition-colors"
          >
            Login
          </button>
        </div>
      </nav>

      {mostrarLogin && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setMostrarLogin(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMostrarLogin(false)}
              className="mb-4"
            >
              ✕
            </button>

            <Login />
          </div>
        </div>
      )}
    </>
  );
}