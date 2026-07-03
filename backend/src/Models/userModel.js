import pool from "../config/db.js";

export const getUsersWithIdGreaterThan = async (minId) => {

    const query = "SELECT * FROM users";

    const [rows] = await pool.query(query, [minId]);

    return rows;
}

export const findUserByEmail = async (email) => {

    const query = "SELECT * FROM users WHERE email = ?";

    const [rows] = await pool.query(query, [email]);

    return rows[0];
};

export const createUser = async (first_name, last_name, email, tel, password) => {

    const query = "INSERT INTO users (first_name, last_name, email, tel, password) VALUES (?, ?, ?, ?, ?)";

    const [result] = await pool.query(query, [first_name, last_name, email, tel, password]);

    return result;
};

