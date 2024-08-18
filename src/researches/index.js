import { Router } from "express";
import {
    getResearches,
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch,
} from "./controller.js";
import validator from "../utils/validator.js";
import validation from "./middleware.js";
import userAuthentication from "../auth/TokenMiddleware.js";

const router = Router();

// middlewares

router.use(validator);
router.use(validation);
router.use(userAuthentication);

// routes
router.get("/", getResearches);
router.get("/:id", getResearch);
router.post("/", createResearch);
router.put("/:id", updateResearch);
router.delete("/:id", deleteResearch);

export default router;
