import { z } from 'zod'

const nameSchema = (fieldName) =>
  z.string()
    .trim()
    .min(2, `${fieldName} debe tener al menos 2 caracteres`)
    .max(40, `${fieldName} no puede superar los 40 caracteres`)
    .regex(/^[\p{L}\s'-]+$/u, `${fieldName} solo puede contener letras`)

const emailSchema = z.string()
  .trim()
  .min(1, 'El email es requerido')
  .max(254, 'El email es demasiado largo')
  .email('Email inválido')

const passwordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(72, 'La contraseña no puede superar los 72 caracteres')
  .regex(/[a-z]/, 'La contraseña debe incluir una minúscula')
  .regex(/[A-Z]/, 'La contraseña debe incluir una mayúscula')
  .regex(/\d/, 'La contraseña debe incluir un número')

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
})

export const registerSchema = z.object({
  nombre: nameSchema('El nombre'),
  apellido: nameSchema('El apellido'),
  email: emailSchema,
  telefono: z.string()
    .trim()
    .regex(/^\d{10,15}$/, 'El teléfono debe tener entre 10 y 15 números'),
  password: passwordSchema,
  confirmar: z.string().min(1, 'Confirmá la contraseña'),
}).refine(data => data.password === data.confirmar, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmar'],
})

export const loginConfig = {
  title: 'Iniciar sesión',
  submitLabel: 'Ingresar',
  schema: loginSchema,
  sections: [
    {
      fields: [
        { id: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'nombre@correo.com', required: true },
        { id: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••', required: true },
      ],
    },
  ],
}

export const registerConfig = {
  title: 'Crear cuenta',
  submitLabel: 'Registrarse',
  schema: registerSchema,
  sections: [
    {
      fields: [
        { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre', required: true },
        { id: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Tu apellido', required: true },
        { id: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'nombre@correo.com', required: true },
        { id: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '2983123456', required: true },
        { id: 'password', label: 'Contraseña', type: 'password', placeholder: '••••••••', required: true },
        { id: 'confirmar', label: 'Confirmar contraseña', type: 'password', placeholder: '••••••••', required: true },
      ],
    },
  ],
}
