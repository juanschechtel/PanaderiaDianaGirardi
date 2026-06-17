import { z } from 'zod'

// ── Schemas ──────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  nombre:    z.string().min(1, 'El nombre es requerido'),
  email:     z.string().min(1, 'El email es requerido').email('Email inválido'),
  password:  z.string().min(6, 'Mínimo 6 caracteres'),
  confirmar: z.string().min(1, 'Confirmá la contraseña'),
}).refine(d => d.password === d.confirmar, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmar'],
})

// ── Configs ───────────────────────────────────────────────
export const loginConfig = {
  title: 'Iniciar sesión',
  submitLabel: 'Ingresar',
  schema: loginSchema,
  sections: [
    {
      fields: [
        { id: 'email',    label: 'Correo electrónico', type: 'email',    placeholder: 'nombre@correo.com', required: true },
        { id: 'password', label: 'Contraseña',         type: 'password', placeholder: '••••••••',         required: true },
      ]
    }
  ]
}

export const registerConfig = {
  title: 'Crear cuenta',
  submitLabel: 'Registrarse',
  schema: registerSchema,
  sections: [
    {
      fields: [
        { id: 'nombre',    label: 'Nombre',               type: 'text',     placeholder: 'Tu nombre completo', required: true },
        { id: 'email',     label: 'Correo electrónico',   type: 'email',    placeholder: 'nombre@correo.com',  required: true },
        { id: 'password',  label: 'Contraseña',           type: 'password', placeholder: '••••••••',           required: true },
        { id: 'confirmar', label: 'Confirmar contraseña', type: 'password', placeholder: '••••••••',           required: true },
      ]
    }
  ]
}
