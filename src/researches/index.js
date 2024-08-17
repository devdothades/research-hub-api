import { Router } from "express";
import {
    getResearches,
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch,
} from "./research.controller";
import validator from "../utils/validator.js";
import userAuth from "./middleware.js";

const router = Router();

// routes and middlewares

router.use(validator);
router.use(userAuth);

router.get("/", getResearches);
router.get("/:id", getResearch);
router.post("/", createResearch);
router.put("/:id", updateResearch);
router.delete("/:id", deleteResearch);

export default router;
