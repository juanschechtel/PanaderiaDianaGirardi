import pool from "../config/db.js";

export const getUsersWithIdGreaterThan = async (minId) => {

    const query = "SELECT first_name FROM users WHERE id >= ?";

    const [rows] = await pool.query(query, [minId]);

    return rows;
}