import pool from "../../model.js";
import asyncHandler from "../utils/asyncHandler.js";

const getResearches = asyncHandler(async (req, res) => {
    const userId = req.userId;

    try {
        console.log(userId);
        console.log("test");
    } catch (error) {
        res.status(401).json({ msg: error });
    }
});
const getResearch = asyncHandler(async (req, res) => {});
const createResearch = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { title, authors, category, strand, description, pdf_name } =
        req.body;
});
const updateResearch = asyncHandler(async (req, res) => {});
const deleteResearch = asyncHandler(async (req, res) => {});

export {
    getResearches,
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch,
};
