import { getProducts, addProduct, editProduct } from "../Models/productModel.js";


// El GET /dashboard/products
export const getAllProducts = async (req, res) => {
    try {

        const products = await getProducts();

        return res.status(200).json(products);

    } catch (error) {

        console.error("Error al obtener productos:", error.message);

        return res.status(500).json({ error: "Error interno del servidor al obtener productos." });
    }
};

// Valida que los campos se carguen correctamente (Sirve para el POST[cargar] y el PUT[actualizar])
const validateProduct = ({ name, category, price, stock }) => {
    if (!name?.trim()) return "El nombre es obligatorio.";
    if (!category?.trim()) return "La categoría es obligatoria.";
    if (isNaN(price) || Number(price) <= 0) return "El precio debe ser un número mayor a 0.";
    if (isNaN(stock) || Number(stock) < 0) return "El stock no puede ser negativo.";
    return null; // Todo en orden
};

// El POST /dashboard/products
export const createProduct = async (req, res) => {
    try {

        const error = validateProduct(req.body);
        if (error) return res.status(400).json({ message: error });

        const { category, name, price, stock, img, description } = req.body;

        const insertID = await addProduct(
            category.trim(),
            name.trim(),
            Number(price),
            parseInt(stock, 10),
            img || null,
            description || null
        )

        return res.status(201).json({
            message: "Producto creado con éxito.",
            productId: insertID
        })
    } catch (error) {
        console.error("Error al crear producto: ", error.message);
        return res.status(500).json({ error: "Error interno del servidor al crear el producto." });
    }
}

export const modifyProduct = async (req, res) => {
    try {

        const error = validateProduct(req.body);
        if (error) return res.status(400).json({ message: error });

        const { category, name, price, stock, img, description, id } = req.body;

        const array = editProduct(
            category.trim(),
            name.trim(),
            Number(price),
            parseInt(stock, 10),
            img || null,
            description || null,
            id
        )
    } catch (error) {

    }

}