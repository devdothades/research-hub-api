import { body } from "express-validator";

const validation = [
    body("title").trim().notEmpty().withMessage("Title is required").isString(),
    body("authors")
        .trim()
        .notEmpty()
        .withMessage("Author is required")
        .isString()
        .withMessage("Author must be a string"),
    body("category")
        .trim()
        .blacklist(" ")
        .notEmpty()
        .withMessage("Category is required")
        .isString()
        .withMessage("Category must be a string"),
    body("strand")
        .trim()
        .blacklist(" ")
        .notEmpty()
        .withMessage("Strand is required")
        .isString()
        .withMessage("Strand must be a string"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isString(),
    body("pdf_name")
        .trim()
        .blacklist(" ")
        .notEmpty()
        .withMessage("Pdf is required")
        .isString(),
];

export default validation;
