import pool from "./model.js";
import app from "./src/index.js";
// stop the server if something goes wrong

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception! Shutting down...");
    console.error(err);
    process.exit(1);
});

pool.connect((err) => {
    if (err) {
        console.error("Database connection failed");
    } else {
        console.log("Database connection successful");
    }
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});
