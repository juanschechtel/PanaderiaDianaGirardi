import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Nosotros from './pages/Nosotros'
import Reservas from './pages/Reservas'
import AdminDashboard from './pages/AdminDashboard'
import AdminProductos from './pages/AdminProductos'
import AdminPedidos from './pages/AdminPedidos'
import AdminClientes from './pages/AdminClientes'
import Footer from './components/Footer'
import Nav from './components/nav'
import { CartProvider } from './components/CartContext'
import './App.css'

// Sitio público: todo lo que ya tenías, agrupado como una sola pantalla.
function SitioPublico() {
  return (
    <>
      <Nav />
      <Home />
      <Productos />
      <Nosotros />
      <Reservas />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SitioPublico />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/pedidos" element={<AdminPedidos />} />
          <Route path="/admin/clientes" element={<AdminClientes />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}