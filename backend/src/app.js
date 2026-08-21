import express from 'express';
import cors from 'cors';
import { register, login } from './Controllers/authController.js'
import getUsers from './Controllers/userControllers.js';
import { verifyToken, checkAdmin } from "./Middlewares/authMiddleware.js";
import { getAllProducts } from "./Controllers/productController.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", verifyToken, getUsers);

app.post("/register", register);

app.post("/login", login);

app.get("/dashboard/products", verifyToken, checkAdmin, getAllProducts);

export default app;