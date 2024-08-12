import pool from "../../model.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const rows = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (rows.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username" });
        }

        const hashedPassword = rows.rows[0].password;

        const match = bcrypt.compareSync(password, hashedPassword);

        if (!match) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: rows.rows[0].id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return res
            .status(200)
            .json({ message: "Successfully logged in", token: token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const signup = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    console.log(username, password, email);

    try {
        const salt = bcrypt.genSaltSync(10);
        const saltedPassword = bcrypt.hashSync(password, salt);

        const rows = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
            [username, saltedPassword, email]
        );

        rows
            ? res.status(200).json({ msg: "successfully created" })
            : res.status(401).json({ msg: "failed to create" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
const getUser = async (req, res) => {
    try {
        const rows = await pool.query("SELECT * FROM users");

        rows
            ? res.status(200).json(rows.rows)
            : res.status(401).json({ msg: "failed to get users" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);

        rows
            ? res.status(200).json(rows.rows[0])
            : res.status(401).json({ msg: "failed to get users" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateUser = async (req, res) => {
    const { username, password, email } = req.body;
    const id = req.params.id;

    try {
        const salt = bcrypt.genSaltSync(10);
        const saltedPassword = bcrypt.hashSync(password, salt);

        const rows = await pool.query(
            "UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4",
            [username, saltedPassword, email, id]
        );

        rows
            ? res.status(200).json({ msg: "successfully updated" })
            : res.status(401).json({ msg: "failed to update" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const rows = await pool.query("DELETE FROM users WHERE id = $1", [id]);

        rows
            ? res.status(200).json({ msg: "successfully deleted" })
            : res.status(401).json({ msg: "failed to delete" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { login, signup, getUser, getUserById, updateUser, deleteUser };
