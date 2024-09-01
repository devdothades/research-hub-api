import pool from "../../model.js";
import asyncHandler from "../utils/asyncHandler.js";

const getResearches = asyncHandler(async (req, res) => {
    try {
        const rows = await pool.query("SELECT * FROM researches;");
        if (rows.rows.length > 0) {
            res.status(200).json(rows.rows);
        } else if (rows.rows.length === 0) {
            res.status(200).json({ msg: "No researches found" });
        } else {
            res.status(401).json({ msg: "Failed to get researches" });
        }
    } catch (error) {
        res.status(401).json({ msg: error });
    }
});
const getResearch = asyncHandler(async (req, res) => {
    const { strand, category } = req.query;
    const { userInput } = req.body;

    try {
        if (userInput) {
            const query = await pool.query(
                "SELECT * FROM researches WHERE title = $1 OR authors = $1;",
                [userInput]
            );

            query
                ? res.status(200).json(query.rows)
                : res.status(401).json({ msg: "no data found" });
        }

        if (strand || category) {
            console.log(strand);
            const query = await pool.query(
                "SELECT * FROM researches WHERE strand = $1 OR category = $2",
                [strand, category]
            );

            query
                ? res.status(200).json(query.rows)
                : res.status(401).json({ msg: "no data found" });
        } else if (category && category) {
            console.log(category);
            const query = await pool.query(
                "SELECT * FROM researches WHERE strand = $1 AND category = $2",
                [strand, category]
            );

            query
                ? res.status(200).json(query.rows)
                : res.status(401).json({ msg: "no data found" });
        }
    } catch (error) {
        res.status(401).json({ msg: error });
    }
});

const createResearch = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const { title, authors, category, strand, description, pdf_name } =
        req.body;

    try {
        const query = await pool.query(
            "SELECT username FROM users WHERE id=$1",
            [userId]
        );

        const uploader = query.rows[0].username;

        const rows = await pool.query(
            "INSERT INTO researches (uploader, title, authors, category, strand, description, pdf_name, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
            [
                uploader,
                title,
                authors,
                category,
                strand,
                description,
                pdf_name,
                userId,
            ]
        );
        rows
            ? res.status(200).json({ msg: "successfully created" }) // if successful, return success message
            : res.status(401).json({ msg: "failed to create" }); // if failed, return failed message
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: error });
    }
});

// TODO: for testing tomorrow
const updateResearch = asyncHandler(async (req, res) => {
    const reqId = req.userId;
    const { id } = req.params;
    const { title, authors, category, strand, description, pdf_name } =
        req.body;

    try {
        const query = await pool.query(
            "UPDATE researches SET title = $1, authors = $2, category = $3, strand = $4, description = $5, pdf_name = $6 WHERE id = $7 AND user_id = $8",
            [title, authors, category, strand, description, pdf_name, id, reqId]
        );

        query
            ? res.status(200).json({ msg: "successfully updated" })
            : res.status(401).json({ msg: "failed to update" });
    } catch (error) {
        res.status(401).json({ msg: error });
    }
});

// TODO: for testing tomorrow
const deleteResearch = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;

    try {
        const query = await pool.query(
            "DELETE FROM researches WHERE id = $1 AND user_id = $2",
            [id, userId]
        );

        query
            ? res.status(200).json({ msg: "successfully deleted" })
            : res.status(401).json({ msg: "failed to delete" });
    } catch (error) {
        res.status(401).json({ msg: error });
    }
});

// for development
// SEEDER
const deleteAll = asyncHandler(async (req, res) => {
    try {
        const query = await pool.query("TRUNCATE TABLE researches;"); // delete all data from researches table

        query
            ? res.status(201).json({ msg: "successfully deleted" })
            : res.status(401).json({ msg: "error deleting" });
    } catch (error) {
        res.status(404).json({ error: error.msg });
    }
});

export {
    getResearches,
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch,
    deleteAll,
};
