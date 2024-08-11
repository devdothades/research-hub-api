import pool from "../../model.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {};
const signup = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    console.log(username, password, email);

    try {
        const salt = bcrypt.genSaltSync(10);
        const saltedPassword = bcrypt.hashSync(password, salt);
        console.log(saltedPassword);

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
const getUser = async (req, res) => {};
const getUserById = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

export { login, signup, getUser, getUserById, updateUser, deleteUser };
