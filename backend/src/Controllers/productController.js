import { getProducts } from "../Models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {

        const products = await getProducts();

        return res.status(200).json(products);

    } catch (error) {

        console.error("Error al obtener productos:", error.message);

        return res.status(500).json({ error: "Error interno del servidor al obtener productos." });
    }
};