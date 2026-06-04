import { useState } from 'react'

const Contador = () => {
  const [contador, setContador] = useState(0)
    return (
    <>
    <div className="flex flex-col items-center justify-center">
    <button className="bg-amber-100 p-4 w-50px  hover:text-amber-900" onClick={() => setContador(contador + 1)}>Incrementar</button>
    <button onClick={() => setContador(contador - 1)} disabled={contador === 0}>Decrementar</button>
    <p>Contador: {contador}</p>
    </div>
    </>
  )
}
export default Contador
