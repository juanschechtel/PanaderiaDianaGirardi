import { getUsersWithIdGreaterThan } from "../Models/userModel.js";

const getUsers = async (req, res) => {
    try {
        const rows = await getUsersWithIdGreaterThan(2);
        console.log("Usuarios:", rows);
        res.json(rows);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export default getUsers;