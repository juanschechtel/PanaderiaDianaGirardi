// configs/formConfigs.js
export const loginConfig = {
  title: "Iniciar sesión",
  submitLabel: "Ingresar",
  sections: [
    {
      fields: [
        { id: "email", label: "Correo", type: "email", required: true, span: 2 },
        { id: "password", label: "Contraseña", type: "password", required: true, span: 2 }
      ]
    }
  ]
};

export const reservaConfig = {
  title: "Nueva reserva",
  submitLabel: "Confirmar reserva",
  sections: [
    {
      label: "Huésped",
      fields: [
        { id: "nombre", label: "Nombre", type: "text", required: true, span: 2 },
        { id: "checkin", label: "Ingreso", type: "date", required: true, span: 1 },
        { id: "checkout", label: "Egreso", type: "date", required: true, span: 1 }
      ]
    }
  ]
  /* Uso en cualquier página
import DynamicForm from "@/components/DynamicForm";
import { reservaConfig } from "@/configs/formConfigs";

export default function ReservaPage() {
  return <DynamicForm config={reservaConfig} onSubmit={data => console.log(data)} />;
} */
};