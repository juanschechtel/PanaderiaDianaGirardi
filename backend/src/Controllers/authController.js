import { json } from "express";
import { findUserByEmail, createUser } from "../Models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, tel, password } = req.body;

        //Verifica si está registrado el mail
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return req.status(400).json({ message: "El email ya está registrado." })
        }

        //Encripta la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Llama a la funcion createUser
        await createUser(first_name, last_name, email, tel, hashedPassword);

        req.status(201).json({ message: "Usuario registrado con éxito en MySQL. " });

    }
    catch (error) {
        console.error("Error en el registro: ", error.message);
        req.status(500).json({ error: "Error interno del servidor." });
    }
}