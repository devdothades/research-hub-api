import { Router } from "express";
import {
    getResearches,
    getResearch,
    getUserResearch,
    createResearch,
    updateResearch,
    deleteResearch,
    deleteAll,
} from "./controller.js";
import validator from "../utils/validator.js";
import validation from "./middleware.js";
import userAuthentication from "../auth/TokenMiddleware.js";

const router = Router();

// middlewares
// router.use(validation);
// router.use(validator);
// router.use(userAuthentication);

// routes
router.get("/", userAuthentication, getResearches);
router.get("/user", userAuthentication, getUserResearch);
router.get("/single", userAuthentication, userAuthentication, getResearch);
router.post("/", userAuthentication, validation, validator, createResearch);
router.put("/:id", userAuthentication, validation, validator, updateResearch);
router.delete("/:id", userAuthentication, deleteResearch);

router.delete("/", deleteAll);

export default router;
