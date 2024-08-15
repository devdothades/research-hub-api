import pool from "../../model.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// LOGIN function
const login = async (req, res) => {
    const { username, password } = req.body; // get username and password from request body

    try {
        // check if username exists
        const rows = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        // if username does not exist, return error
        if (rows.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username" });
        }

        // if username exists, get the password from the the database from that username
        const hashedPassword = rows.rows[0].password;

        // compare the password from the request body with the password from the database
        const match = bcrypt.compareSync(password, hashedPassword);

        // if the password does not match, return error
        if (!match) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // if the password matches, create a token

        const token = jwt.sign(
            { userId: rows.rows[0].id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        // return the token
        return res
            .status(200)
            .json({ message: "Successfully logged in", token: token });
    } catch (error) {
        // if there is an error, return the error
        return res.status(500).json({ message: error.message });
    }
};

// SIGNUP function
const signup = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body; // get username, password and email from request body

    console.log(username, password, email); // for debugging

    try {
        //  generate a salt for security
        const salt = bcrypt.genSaltSync(10);

        // hash the password with the salt
        const saltedPassword = bcrypt.hashSync(password, salt);

        // insert the username, password and email into the database
        const rows = await pool.query(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
            [username, saltedPassword, email]
        );

        rows
            ? res.status(200).json({ msg: "successfully created" }) // if successful, return success message
            : res.status(401).json({ msg: "failed to create" }); // if failed, return failed message
    } catch (error) {
        return res.status(500).json({ message: error.message }); // if there is an error, return the error
    }
});

// GET ALL USER function
const getUser = async (req, res) => {
    try {
        // get all users from the database
        const rows = await pool.query("SELECT * FROM users");

        rows
            ? res.status(200).json(rows.rows) // if successful, return all users
            : res.status(401).json({ msg: "failed to get users" }); // if failed, return failed message
    } catch (error) {
        return res.status(500).json({ message: error.message }); // if there is an error, return the error
    }
};

// GET ONE USER BY ID function
const getUserById = async (req, res) => {
    const { id } = req.params; // get the id from the request parameters
    try {
        // get the user with the id from the database
        const rows = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);

        rows
            ? res.status(200).json(rows.rows[0]) // if successful, return the user
            : res.status(401).json({ msg: "failed to get users" }); // if failed, return failed message
    } catch (error) {
        res.status(500).json({ message: error.message }); // if there is an error, return the error
    }
};

// UPDATE USER function
const updateUser = async (req, res) => {
    const { username, password, email } = req.body; // get username, password and email from request body
    const id = req.params.id; // get the id from the request parameters

    try {
        const salt = bcrypt.genSaltSync(10); // generate a salt for security
        const saltedPassword = bcrypt.hashSync(password, salt); // hash the password with the salt

        // update the username, password and email in the database
        const rows = await pool.query(
            "UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4",
            [username, saltedPassword, email, id]
        );

        rows
            ? res.status(200).json({ msg: "successfully updated" }) // if successful, return success message
            : res.status(401).json({ msg: "failed to update" }); // if failed, return failed message
    } catch (error) {
        res.status(500).json({ message: error.message }); // if there is an error, return the error
    }
};

// DELETE USER function
const deleteUser = async (req, res) => {
    const { id } = req.params; // get the id from the request parameters

    try {
        // delete the user with the id from the database
        const rows = await pool.query("DELETE FROM users WHERE id = $1", [id]);

        rows
            ? res.status(200).json({ msg: "successfully deleted" }) // if successful, return success message
            : res.status(401).json({ msg: "failed to delete" }); // if failed, return failed message
    } catch (error) {
        res.status(500).json({ message: error.message }); // if there is an error, return the error
    }
};
// export the functions to be used in the routes <src/user/index.js>
export { login, signup, getUser, getUserById, updateUser, deleteUser };
