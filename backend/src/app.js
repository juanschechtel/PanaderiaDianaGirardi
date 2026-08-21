import express from 'express';
import cors from 'cors';
import { register, login } from './Controllers/authController.js'
import getUsers from './Controllers/userControllers.js';
import { verifyToken, checkAdmin } from "./Middlewares/authMiddleware.js";
import { getAllProducts, createProduct } from "./Controllers/productController.js";

const app = express();

app.use(cors());

app.use(express.json());

// Auth & Users
app.post("/register", register);
app.post("/login", login);
app.get("/users", verifyToken, checkAdmin, getUsers);

// Productos (Stock)
app.get("/dashbonard/products", verifyToken, checkAdmin, getAllProducts);
app.post("/dashboard/products", verifyToken, checkAdmin, createProduct);

export default app;