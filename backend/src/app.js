import express from 'express';
import cors from 'cors';
import { register } from './Controllers/authController.js'
import getUsers from './Controllers/userControllers.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", getUsers);

app.post("/register", register)

export default app;