import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import errorhandler from "./utils/errorhandler";

dotenv.configDotenv();

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ROUTES

app.use("*", (req, res, next) => {
    next(new Error("Route not found"));
});

app.use(errorhandler);

export default app;
