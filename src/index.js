// modules
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import errorhandler from "./utils/errorhandler.js";

dotenv.configDotenv();

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logging middleware for development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ROUTES
import userRoute from "./user/index.js";
app.use("/app/v1/users", userRoute);

// returns an error if the route is not found
app.use("*", (req, res, next) => {
    next(new Error("Route not found"));
});

// error handler middleware
app.use(errorhandler);

export default app;
