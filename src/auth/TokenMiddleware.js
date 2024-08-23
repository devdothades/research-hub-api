import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.configDotenv();

const userAuthentication = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    console.log(token);

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }

        req.userId = decoded.userId;
        next();
    });
};

export default userAuthentication;
