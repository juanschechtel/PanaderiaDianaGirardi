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

Cada uno en su pc debe descargar dbgin y dbeaver. El primero sirve para crear la base de datos alojada en el server
la segunda sirve para poder manipular los datos.

dbgin: https://dbngin.com/download


dbeaver: https://dbeaver.io/download/


😘 CÓDIGO DE LA DB:

create database Girardi;
use Girardi;

-- 2. Creación de tablas base
create table users (
	id INT auto_increment primary key,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(100) unique not null,
	tel varchar(10) check (tel regexp '^[0-9]{10}$') not null,
	password varchar(255) not null,
	usertype enum ('admin', 'client', 'provider') default 'client'
);

create table product (
	product_id int auto_increment primary key,
	category varchar(50) not null,
	name varchar(50) not null,
	price decimal(10,2) check (price > 0) default 0.01 not null,
	stock int check (stock >= 0) default 0 not null,
	img varchar(1024) default null,
	description text default null
);

-- 3. Creación de tablas con dependencias (FK a users)
create table breakfast (
	breakfast_id int auto_increment primary key,
	total_price decimal(10,2) check (total_price > 0) not null,
	status enum ('pending', 'confirmed', 'delivered', 'cancelled') not null default 'pending',
	date_ordered date not null,
	detail varchar(1024) default null,
	guests_count int check (guests_count > 0),
	users_id int not null,
	foreign key (users_id) references users(id)	
);

create table orders (
	order_id int auto_increment primary key,
	total_price decimal(10,2) check (total_price > 0) not null,
	status enum ('pending', 'confirmed', 'delivered', 'cancelled') not null default 'pending',
	date_ordered date not null,
	time_ordered time not null,
	pickup_time time not null,
	detail varchar(1024) default null,
	users_id int not null,
	foreign key (users_id) references users(id)
);

create table event (
	event_id int auto_increment primary key,
	total_price decimal(10,2) check (total_price > 0) not null,
	delivery_date date not null,
	detail varchar(1024) default null,
	event_type varchar(100) not null,
	users_id int not null,
	foreign key (users_id) references users(id)
);

-- 4. Creación de tablas intermedias (FK a entidades y productos)
create table breakfast_product (
	breakfast_id int not null,
	product_id int not null,
	quantity int check (quantity > 0) not null default 1,
	primary key (breakfast_id, product_id),
	foreign key (breakfast_id) references breakfast(breakfast_id),
	foreign key (product_id) references product(product_id)
);

create table event_product (
	event_id int not null,
	product_id int not null,
	quantity int check (quantity > 0) not null default 1,
	primary key (event_id, product_id),
	foreign key (event_id) references event(event_id),
	foreign key (product_id) references product(product_id)
);

create table orders_product (
	order_id int not null,
	product_id int not null,
	quantity int check (quantity > 0) not null default 1,
	primary key (order_id, product_id),
	foreign key (order_id) references orders(order_id),
	foreign key (product_id) references product(product_id)
);

show tables;

-- Primero los usuarios (Nacen con IDs: 1, 2, 3, 4)
insert into users(first_name, last_name, email, tel, password, usertype) values 
('Juan', 'Schechtel', 'juanpabloschechtel@gmail.com', '2915341322', 'juan123', 'admin'),
('Joshue', 'Ardiles', 'Ardilesgabriel10@gmail.com', '2915741695', 'riverteamo', 'client'),
('Tomas', 'Dumrauf', 'Dumrauftomas3003@gmail.com', '2915228880', 'bestyonelas', 'provider'),
('Marcos', 'Salazar', 'marcosdsalazar39@gmail.com', '2983503368', 'marcos1', 'client');

-- Segundo los productos (Nacen con IDs: 1, 2, 3, 4)
insert into product (category, name, price, stock, img, description) values 
('panificado', 'croassaint', 3000.00, 3, 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Croissant-Petr_Kratochvil.jpg', 'Panificado hojaldrado en base de manteca, especialidad de la casa' ),
('cookie', 'red velvet cookie', 6000.00, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28SKQ6UDZDTBEpvg_49AKo3Cj89X5aniPvg&s', 'Panificado denso y húmedo en base de cacao sutil y manteca.'),
('cafeteria', 'Capuccino Grande', 2500.00, 50, null, 'Café espresso con leche vaporizada y espuma de leche.'),
('salado', 'Tostado de JyQ', 3500.00, 15, null, 'Tostado en pan de miga con manteca.');

-- Tercero los encabezados de pedidos (Ya existen los usuarios 2 y 4)
insert into breakfast (total_price, status, date_ordered, detail, guests_count, users_id) values 
(8000.00, 'confirmed', '2026-05-23', 'Desayuno sorpresa', 2, 2); -- Crea breakfast_id = 1

insert into orders (total_price, status, date_ordered, time_ordered, pickup_time, detail, users_id) values 
(9500.00, 'pending', '2026-05-22', '16:30:00', '17:15:00', 'Retira por el local', 4); -- Crea order_id = 1

insert into event (total_price, delivery_date, detail, event_type, users_id) values 
(60000.00, '2026-06-15', 'Mesa dulce empresarial', 'Corporativo', 4); -- Crea event_id = 1

-- Cuarto y último: Las relaciones intermedias (Ya existen los productos y los pedidos)
insert into breakfast_product (breakfast_id, product_id, quantity) values 
(1, 1, 1), 
(1, 3, 2); 

insert into orders_product (order_id, product_id, quantity) values 
(1, 2, 1), 
(1, 4, 1); 

insert into event_product (event_id, product_id, quantity) values 
(1, 1, 10), 
(1, 2, 5);

