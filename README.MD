🔵 Backend (Node.js)
config/db.js → conexión a MySQL
models/ → representan las tablas
controllers/ → manejan requests/responses
services/ → lógica de negocio 
routes/ → endpoints (ej: /productos /reservas /historia)
middlewares/ → auth, validaciones, etc
app.js → configuración de Express
server.js → levanta el servidor

🟢 Frontend (HTML + Tailwind + JS)
index.html → tu página principal
css/styles.css → Tailwind + estilos propios
js/main.js → lógica del front
js/api.js → conexión con backend
assets/ → imágenes

🟡 Base de datos
schema.sql → estructura de tablas
seed.sql → datos iniciales

COMO CORRER EN LOCALHOST
Backend

-cd backend
-npm install
-npm run dev

Frontend
-cd frontend
-npm install
-npm run dev
