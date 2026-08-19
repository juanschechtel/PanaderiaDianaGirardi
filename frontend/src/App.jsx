import Home from './pages/Home'
import Productos from './pages/Productos'
import Nosotros from './pages/Nosotros'
import Reservas from './pages/Reservas'
import Nav from './components/nav'
import { CartProvider } from './components/CartContext'
import './App.css'

export default function App() {
  return (
    <CartProvider>
      <Nav />
      <Home />
      <Productos />
      <Nosotros />
      <Reservas />
    </CartProvider>
  )
}