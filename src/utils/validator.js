import { validationResult } from "express-validator";

// validation middleware

const validator = (req, res, next) => {
    const errors = validationResult(req); // get the validation result
    // if there are no errors, continue to the next middleware
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = []; // extract the errors
    // map through the errors and push them to the extractedErrors array
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    console.log(extractedErrors); // log the errors {for debugging}

    // return the errors as a response
    return res.status(422).json({
        errors: extractedErrors,
    });
};

export default validator;
