import express from 'express';
import cors from 'cors';
import { register, login } from './Controllers/authController.js'
import getUsers from './Controllers/userControllers.js';
import { verifyToken } from "./Middlewares/authMiddleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", verifyToken, getUsers);

app.post("/register", register);

app.post("/login", login);

export default app;