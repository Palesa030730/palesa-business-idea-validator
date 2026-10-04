const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5433,
    database: "business_validator",
    user: "business_user",
    password: "business_password"
});

pool.on("connect", () => {
    console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL error:", err);
});

module.exports = pool;