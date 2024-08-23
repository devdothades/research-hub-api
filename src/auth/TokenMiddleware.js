import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.configDotenv();

const userAuthentication = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // get the token from headers
    const token = authHeader.split(" ")[1]; // removing the "bearer" from the token

    console.log(token); // for development

    if (token == null) {
        return res.sendStatus(401); // returns error code if the token is null
    }

    // verify the token if it matches with the environment key
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }

        // stores the user id in a userId request header
        req.userId = decoded.userId;
        next();
    });
};

export default userAuthentication;
