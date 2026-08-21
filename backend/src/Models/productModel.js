import pool from "../config/db.js";

export const getProducts = async () => {

    const query = "SELECT * FROM product"

    const [rows] = await pool.query(query)

    return rows;
}