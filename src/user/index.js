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

// router.use(userValidation);
// router.use(validator);

router.get("/:id", getUserById);
router.put("/:id", userValidation, validator, updateUser);
router.delete("/:id", deleteUser);
router.post("/", userValidation, validator, signup);
router.post("/", userValidation, validator, login);
router.get("/", getUser);

export default router;
