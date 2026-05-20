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


😘 CÓDIGO DE LA DB:

create database Girardi;

use Girardi;

create table users (
	id INT auto_increment primary key,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(100) unique not null,
	tel varchar(10) check (tel regexp '^[0-9]{10}$') not null,
	password varchar(255) not null,
	usertype enum ('admin', 'client', 'provider') not null
);

create table product (
	product_id int auto_increment primary key,
	category varchar(50) not null,
	name varchar(50) not null,
	price decimal(10,2) check (price > 0) default 0.00 not null,
	stock int check (stock >= 0) default 0 not null,
	img varchar(1024) default null,
	description text default null
);

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

create table breakfast_product (
	breakfast_id int not null,
	product_id int not null,
	foreign key (breakfast_id) references breakfast(breakfast_id),
	foreign key (product_id) references product(product_id)
);

create table event_product (
	event_id int not null,
	product_id int not null,
	foreign key (event_id) references event(event_id),
	foreign key (product_id) references product(product_id)
);

create table orders_product (
	order_id int not null,
	product_id int not null,
	foreign key (order_id) references orders(order_id),
	foreign key (product_id) references product(product_id)
);