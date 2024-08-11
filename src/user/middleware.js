import { body } from "express-validator";
import pool from "../../model.js";

const userValidation = [
    body("username")
        .trim()
        .blacklist(" ")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .customSanitizer((username) => username.toLowerCase())
        .custom(async (username) => {
            const rows = await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );
            if (rows.length) {
                return Promise.reject("Username already in use");
            }
        }),
    body("password")
        .trim()
        .blacklist(" ")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    body("email")
        .trim()
        .blacklist(" ")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .customSanitizer((email) => email.toLowerCase())
        .custom(async (email) => {
            const rows = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
            if (rows.length) {
                return Promise.reject("Email already in use");
            }
        }),
];

export default userValidation;
