import pool from "../config/db.js";

const showProducts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT first_name FROM users WHERE id >= 2 ")
        console.log("Usuarios:", rows)
        res.json(rows)
    } catch (error) {
        console.error("Error:", error.message)
        res.status(500).json({ error: error.message })
    }
}

export default showProducts;