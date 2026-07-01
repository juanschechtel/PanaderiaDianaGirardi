import { useState } from 'react'
import DynamicForm from './DynamicForm'
import { loginConfig, registerConfig } from '../configs/formConfig'

const configs = { login: loginConfig, register: registerConfig }
const endpoints = { login: '/api/auth/login', register: '/api/auth/register' }

export default function AuthModal({ isOpen, onClose, mode = 'login' }) {
  const [serverError, setServerError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (values) => {
    setServerError('')

    const body = {
      first_name: values.nombre,
      last_name: values.apellido,
      email: values.email,
      tel: values.telefono,
      password: values.password,
    }

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al procesar')

      if (mode === 'login') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
      }
      onClose()
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 flex flex-col gap-4">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl text-red-500">
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {mode === 'login' ? 'Accedé a tu cuenta' : 'Completá tus datos'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors p-1.5 rounded-full"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Error servidor */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg">
            {serverError}
          </div>
        )}

        {/* Form */}
        <DynamicForm config={configs[mode]} onSubmit={handleSubmit} />

      </div>
    </div>
  )
}
