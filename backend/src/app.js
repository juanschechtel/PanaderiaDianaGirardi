import express from 'express';
import showProducts from './Controllers/productController.js';

const app = express();

app.get("/", showProducts);

export default app;