import pool from "../config/db.js";

export const getProducts = async () => {

    const query = "SELECT * FROM product"

    const [rows] = await pool.query(query)

    return rows;
}

export const addProduct = async (category, name, price, stock, img, description) => {

    const query = "INSERT INTO product (category, name, price, stock, img, description) values (?, ?, ?, ?, ?, ?)"

    const [result] = await pool.query(query, [category, name, price, stock, img, description])

    return result.insertId;

};