import pool from "../../model";
import asyncHandler from "../utils/asyncHandler.js";

const getResearches = asyncHandler(async (req, res) => {});
const getResearch = asyncHandler(async (req, res) => {});
const createResearch = asyncHandler(async (req, res) => {});
const updateResearch = asyncHandler(async (req, res) => {});
const deleteResearch = asyncHandler(async (req, res) => {});

export {
    getResearches,
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch,
};
