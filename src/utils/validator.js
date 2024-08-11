import { validationResult } from "express-validator";

// validation middleware

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    console.log(extractedErrors);
    return res.status(422).json({
        errors: extractedErrors,
    });
};

export default validator;
