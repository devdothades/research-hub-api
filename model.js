import pg from "pg";
import dotenv from "dotenv";
dotenv.configDotenv();

// connect to the database with your database account
const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

// create tables
const createTables = async () => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const user = `CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`;

        const messages = `CREATE TABLE IF NOT EXISTS messages(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message VARCHAR(255) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`;

        const researches = `
          CREATE TABLE IF NOT EXISTS researches(
            id SERIAL PRIMARY KEY,
            uploader VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            authors VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            strand VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            pdf_name VARCHAR(255) NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
          )`;

        const comments = `
          CREATE TABLE IF NOT EXISTS comments(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            comment VARCHAR(255) NOT NULL,
            repository VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )`;

        const admin = `
          CREATE TABLE IF NOT EXISTS admin(
           id SERIAL PRIMARY KEY,
           username VARCHAR (255) UNIQUE NOT NULL,
           password VARCHAR (255) NOT NULL
          )`;

        await client.query(user);
        await client.query(messages);
        await client.query(researches);
        await client.query(comments);
        await client.query(admin);

        await client.query("COMMIT");
        console.log("Tables created successfully");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error creating tables", error);
    } finally {
        client.release();
    }
};

createTables().catch((err) => {
    console.error("Error in createTables: ", err); // log the error
});
export default pool;
