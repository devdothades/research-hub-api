import { Router } from "express";
import validator from "../utils/validator.js";
import userValidation from "./middleware.js";

import {
    login,
    signup,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
} from "./controller.js";
const router = Router();

router.use(userValidation);
router.use(validator);

router.post("/", signup);
router.post("/", login);
router.get("/", getUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
