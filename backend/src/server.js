
import express from 'express';
import showProducts from './Controllers/productController.js';

const app = express();

const port = 3000;


app.get("/", showProducts);


app.listen(port, () => {
  console.log("Server corriendo");
})

