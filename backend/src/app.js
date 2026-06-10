import express from 'express';
import { register } from './Controllers/authController.js'
import getUsers from './Controllers/userControllers.js';

const app = express();

app.use(express.json())

app.get("/", getUsers);

app.post("/register", register)

export default app;