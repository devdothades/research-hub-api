import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import pool from "./model.js";
dotenv.configDotenv();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.connect((err) => {
  if (err) {
    console.error("Database connection failed");
  } else {
    console.log("Database connection successful");
  }
});
