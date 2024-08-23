import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.configDotenv();

const userAuthentication = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // get the token from header
    const token = authHeader.split(" ")[1]; // removing the "bearer" from the token

    console.log(token); // for development

    if (token == null) {
        return res.sendStatus(401); // returns error code if the token is empty or null
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(401); // returns if somethings goes wrong
        }

        req.userId = decoded.userId; // storing the id of the user in
        next();
    });
};

export default userAuthentication;
